import { type User, type InsertUser, type Country, type InsertCountry, type Certification, type InsertCertification, type Report, type InsertReport, type Membership, type InsertMembership } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Countries
  getAllCountries(): Promise<Country[]>;
  getCountriesByRegion(region: string): Promise<Country[]>;
  getCountriesByScore(minScore: number): Promise<Country[]>;
  getCountry(id: string): Promise<Country | undefined>;
  createCountry(country: InsertCountry): Promise<Country>;
  
  // Certifications
  getCertification(id: string): Promise<Certification | undefined>;
  getAllCertifications(): Promise<Certification[]>;
  createCertification(certification: InsertCertification): Promise<Certification>;
  updateCertificationStatus(id: string, status: string, level?: string): Promise<Certification | undefined>;
  
  // Reports
  getReport(id: string): Promise<Report | undefined>;
  getAllReports(): Promise<Report[]>;
  getReportsByUser(userId: string): Promise<Report[]>;
  createReport(report: InsertReport): Promise<Report>;
  
  // Memberships
  getMembershipByUserId(userId: string): Promise<Membership | undefined>;
  createMembership(membership: InsertMembership): Promise<Membership>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private countries: Map<string, Country> = new Map();
  private certifications: Map<string, Certification> = new Map();
  private reports: Map<string, Report> = new Map();
  private memberships: Map<string, Membership> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with some sample countries for demonstration
    const sampleCountries: Country[] = [
      {
        id: randomUUID(),
        name: "Canada",
        code: "CA",
        region: "Americas",
        safetyScore: 85,
        trend: "stable",
        latitude: "56.130366" as any,
        longitude: "-106.346771" as any,
        lastUpdated: new Date(),
      },
      {
        id: randomUUID(),
        name: "Netherlands",
        code: "NL",
        region: "Europe",
        safetyScore: 92,
        trend: "improving",
        latitude: "52.132633" as any,
        longitude: "5.291266" as any,
        lastUpdated: new Date(),
      },
      {
        id: randomUUID(),
        name: "Sweden",
        code: "SE",
        region: "Europe",
        safetyScore: 89,
        trend: "stable",
        latitude: "60.128161" as any,
        longitude: "18.643501" as any,
        lastUpdated: new Date(),
      },
      {
        id: randomUUID(),
        name: "Germany",
        code: "DE",
        region: "Europe",
        safetyScore: 76,
        trend: "improving",
        latitude: "51.165691" as any,
        longitude: "10.451526" as any,
        lastUpdated: new Date(),
      },
    ];

    sampleCountries.forEach(country => {
      this.countries.set(country.id, country);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      membershipTier: insertUser.membershipTier || "Community",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getAllCountries(): Promise<Country[]> {
    return Array.from(this.countries.values());
  }

  async getCountriesByRegion(region: string): Promise<Country[]> {
    return Array.from(this.countries.values()).filter(country => 
      region === "all" || country.region === region
    );
  }

  async getCountriesByScore(minScore: number): Promise<Country[]> {
    return Array.from(this.countries.values()).filter(country => 
      country.safetyScore >= minScore
    );
  }

  async getCountry(id: string): Promise<Country | undefined> {
    return this.countries.get(id);
  }

  async createCountry(insertCountry: InsertCountry): Promise<Country> {
    const id = randomUUID();
    const country: Country = {
      ...insertCountry,
      id,
      latitude: insertCountry.latitude || null,
      longitude: insertCountry.longitude || null,
      lastUpdated: new Date(),
    };
    this.countries.set(id, country);
    return country;
  }

  async getCertification(id: string): Promise<Certification | undefined> {
    return this.certifications.get(id);
  }

  async getAllCertifications(): Promise<Certification[]> {
    return Array.from(this.certifications.values());
  }

  async createCertification(insertCertification: InsertCertification): Promise<Certification> {
    const id = randomUUID();
    const certification: Certification = {
      ...insertCertification,
      id,
      status: "pending",
      level: insertCertification.level || "bronze",
      verificationId: `IQSF-${Date.now().toString().slice(-4)}-2025`,
      notes: insertCertification.notes || null,
      createdAt: new Date(),
    };
    this.certifications.set(id, certification);
    return certification;
  }

  async updateCertificationStatus(id: string, status: string, level?: string): Promise<Certification | undefined> {
    const certification = this.certifications.get(id);
    if (certification) {
      certification.status = status;
      if (level) {
        certification.level = level;
      }
      this.certifications.set(id, certification);
      return certification;
    }
    return undefined;
  }

  async getReport(id: string): Promise<Report | undefined> {
    return this.reports.get(id);
  }

  async getAllReports(): Promise<Report[]> {
    return Array.from(this.reports.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getReportsByUser(userId: string): Promise<Report[]> {
    return Array.from(this.reports.values()).filter(report => 
      report.generatedBy === userId
    );
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const id = randomUUID();
    const report: Report = {
      ...insertReport,
      id,
      content: insertReport.content || null,
      countries: insertReport.countries || null,
      downloadUrl: `/api/reports/${id}/download`,
      generatedBy: insertReport.generatedBy || null,
      createdAt: new Date(),
    };
    this.reports.set(id, report);
    return report;
  }

  async getMembershipByUserId(userId: string): Promise<Membership | undefined> {
    return Array.from(this.memberships.values()).find(membership => 
      membership.userId === userId && membership.status === "active"
    );
  }

  async createMembership(insertMembership: InsertMembership): Promise<Membership> {
    const id = randomUUID();
    const membership: Membership = {
      ...insertMembership,
      id,
      status: insertMembership.status || "active",
      startDate: new Date(),
      endDate: insertMembership.endDate || null,
    };
    this.memberships.set(id, membership);
    return membership;
  }
}

export const storage = new MemStorage();
