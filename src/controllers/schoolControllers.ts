import prisma from "../prisma.js";
import { Request, Response } from "express";

export const addSchool = async (req: Request, res: Response) => {
  const { name, address, longitude, latitude } = req.body;

  try {
    if (!name || !address || !longitude || !latitude) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const school = await prisma.school.create({
      data: {
        name,
        address,
        longitude,
        latitude,
      },
    });

    res.status(201).json({
      success: true,
      message: "School created successfully",
      data: school,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message || "Something went wrong",
    });
  }
};

export const getSchools = async (req: Request, res: Response) => {
  const { longitude, latitude } = req.query as {
    longitude?: string;
    latitude?: string;
  };

  try {
    if (!longitude || !latitude) {
      return res
        .status(400)
        .json({ message: "Longitude and latitude are required" });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    if (isNaN(userLat) || isNaN(userLon)) {
      return res
        .status(400)
        .json({ message: "Invalid longitude or latitude values" });
    }

    const schools = await prisma.school.findMany({});

    const schoolsWithDistance = schools.map((school: any) => ({
      ...school,
      distance: calculateDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      ),
    }));

    const sortedSchools = schoolsWithDistance.sort(
      (a: any, b: any) => a.distance - b.distance
    );

    res.status(200).json({
      success: true,
      message: "Schools fetched and sorted successfully",
      data: sortedSchools,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message || "Something went wrong",
    });
  }
};

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
