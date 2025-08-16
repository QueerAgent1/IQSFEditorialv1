import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCountrySchema, insertCertificationSchema, insertReportSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Countries API
  app.get("/api/countries", async (req, res) => {
    try {
      const { region, minScore } = req.query;
      let countries;
      
      if (region && region !== "all") {
        countries = await storage.getCountriesByRegion(region as string);
      } else {
        countries = await storage.getAllCountries();
      }
      
      if (minScore) {
        countries = countries.filter(country => country.safetyScore >= parseInt(minScore as string));
      }
      
      res.json(countries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch countries" });
    }
  });

  app.get("/api/countries/:id", async (req, res) => {
    try {
      const country = await storage.getCountry(req.params.id);
      if (!country) {
        return res.status(404).json({ error: "Country not found" });
      }
      res.json(country);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch country" });
    }
  });

  // Statistics API
  app.get("/api/statistics", async (req, res) => {
    try {
      const countries = await storage.getAllCountries();
      const totalCountries = countries.length;
      const improvingTrend = countries.filter(c => c.trend === "improving").length;
      const topRated = countries.filter(c => c.safetyScore >= 80).length;
      const averageScore = Math.round(countries.reduce((sum, c) => sum + c.safetyScore, 0) / totalCountries);
      
      res.json({
        totalCountries,
        improvingTrendPercentage: Math.round((improvingTrend / totalCountries) * 100),
        topRatedCount: topRated,
        averageScore,
        dataPoints: totalCountries * 150 // Simulated data points
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });

  // Certifications API
  app.get("/api/certifications", async (req, res) => {
    try {
      const certifications = await storage.getAllCertifications();
      res.json(certifications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch certifications" });
    }
  });

  app.post("/api/certifications", async (req, res) => {
    try {
      const validatedData = insertCertificationSchema.parse(req.body);
      const certification = await storage.createCertification(validatedData);
      res.status(201).json(certification);
    } catch (error) {
      res.status(400).json({ error: "Invalid certification data" });
    }
  });

  // Reports API  
  app.get("/api/reports", async (req, res) => {
    try {
      const reports = await storage.getAllReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reports" });
    }
  });

  app.post("/api/reports/generate", async (req, res) => {
    try {
      const { type, countries, format, title } = req.body;
      
      const reportData = {
        title: title || `${type} Report - ${new Date().toLocaleDateString()}`,
        type,
        countries,
        format,
        content: {
          summary: "AI-generated safety analysis based on current data",
          metrics: await storage.getAllCountries(),
          generated: new Date().toISOString()
        },
        generatedBy: req.body.userId || "anonymous"
      };
      
      const report = await storage.createReport(reportData);
      res.status(201).json(report);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate report" });
    }
  });

  app.get("/api/reports/:id/download", async (req, res) => {
    try {
      const report = await storage.getReport(req.params.id);
      if (!report) {
        return res.status(404).json({ error: "Report not found" });
      }
      
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${report.title}.json"`);
      res.json(report.content);
    } catch (error) {
      res.status(500).json({ error: "Failed to download report" });
    }
  });

  // User registration/auth (simplified)
  app.post("/api/users/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(validatedData.email);
      
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      
      const user = await storage.createUser(validatedData);
      res.status(201).json({ id: user.id, email: user.email, membershipTier: user.membershipTier });
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
