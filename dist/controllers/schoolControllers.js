var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../prisma.js";
export const addSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, longitude, latitude } = req.body;
    try {
        if (!name || !address || !longitude || !latitude) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const school = yield prisma.school.create({
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message || "Something went wrong",
        });
    }
});
export const getSchools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { longitude, latitude } = req.query;
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
        const schools = yield prisma.school.findMany({});
        const schoolsWithDistance = schools.map((school) => (Object.assign(Object.assign({}, school), { distance: calculateDistance(userLat, userLon, school.latitude, school.longitude) })));
        const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
        res.status(200).json({
            success: true,
            message: "Schools fetched and sorted successfully",
            data: sortedSchools,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message || "Something went wrong",
        });
    }
});
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
