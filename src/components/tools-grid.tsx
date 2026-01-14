
import { getDBTools } from "@/lib/course-service";
import { ToolsGridClient } from "./tools-grid-client";

export async function ToolsGrid() {
    const tools = await getDBTools();

    // If no tools in DB yet, return null
    if (!tools || tools.length === 0) {
        return null;
    }

    return <ToolsGridClient initialTools={tools} />;
}
