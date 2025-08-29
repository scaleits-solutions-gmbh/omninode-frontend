import { FeClientActivity } from "@/types/acmp/client";
// Mock activity data that changes every minute
let lastUpdateTime = Date.now();
let mockActivity: FeClientActivity = {
    activeDevices: 12,
    inactiveDevices: 3,
};

// Function to update mock data
const updateMockActivity = () => {
    const currentTime = Date.now();
    // Only update if more than a minute has passed
    if (currentTime - lastUpdateTime > 60000) {
        // Randomly adjust active and inactive devices
        mockActivity = {
            activeDevices: Math.max(0, mockActivity.activeDevices + Math.floor(Math.random() * 3) - 1),
            inactiveDevices: Math.max(0, mockActivity.inactiveDevices + Math.floor(Math.random() * 3) - 1),
        };
        lastUpdateTime = currentTime;
    }
};

export const fetchAcmpActivity = async (): Promise<FeClientActivity> => {
    //wait 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateMockActivity();
    return mockActivity;
}; 