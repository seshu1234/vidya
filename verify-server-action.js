/* eslint-disable @typescript-eslint/no-require-imports */
const { updateCourse } = require('./src/app/(admin)/admin/courses/actions');
require('dotenv').config({ path: '.env.local' });

// We need to mock Next.js server environment for server actions to run in Node
// or just test the logic. Since server actions are just functions, we can call them.
// Note: revalidatePath will fail in Node if not mocked, but we can catch it.

async function verifyFinal() {
    const courseId = '9e9775f9-abfc-44bb-84b7-8457d1cc3327';
    const data = {
        title: 'C Programming Masterclass (Final Fix)',
        is_published: true
    };

    console.log("Calling updateCourse server action...");
    try {
        await updateCourse(courseId, data);
        console.log("SUCCESS: updateCourse completed without error.");
    } catch (e) {
        console.error("FAILURE: updateCourse threw error:", e.message);
    }
}

verifyFinal();
