// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
// 	plugins: [react()],
// 	server: {
// 		proxy: {
// 			"/api": {
// 				target: "http://localhost:5000",
// 			},
// 		},
// 	},
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    // Add this if you keep getting the jsx key error
    esbuild: {
        jsx: 'automatic',
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:5000",
            },
        },
		
    },
});