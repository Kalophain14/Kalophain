import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Try a range of ports starting from the preferred port
  const startPort = Number(process.env.PORT) || 5000;
  const maxPort = startPort + 10; // Try up to 10 ports
  let currentPort = startPort;
  let serverStarted = false;

  while (currentPort <= maxPort && !serverStarted) {
    try {
      await new Promise((resolve, reject) => {
        server.listen({
          port: currentPort,
          host: "0.0.0.0",
          reusePort: true,
        }, () => {
          log(`Server initialization successful`);
          log(`Configuration: PORT=${currentPort}, ENV=${app.get("env")}`);
          log(`Server running at http://0.0.0.0:${currentPort}`);
          log(`Health check available at http://0.0.0.0:${currentPort}/health`);
          serverStarted = true;
          resolve(true);
        }).on('error', (err: any) => {
          if (err.code === 'EADDRINUSE') {
            currentPort++;
            resolve(false);
          } else {
            reject(err);
          }
        });
      });
    } catch (error) {
      log(`Failed to start server: ${error}`);
      process.exit(1);
    }
  }

  if (!serverStarted) {
    log(`Could not find an available port between ${startPort} and ${maxPort}`);
    process.exit(1);
  }

  // Add health check endpoint
  app.get("/health", (_req, res) => {
    res.json({ 
      status: "healthy", 
      port: currentPort, 
      env: app.get("env") 
    });
  });
})();