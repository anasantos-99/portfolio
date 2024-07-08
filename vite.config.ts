import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       assetFileNames: (asset) => {
  //         let id = asset.name.split("-")[0];
  //         let type = asset.name.split(".")[1];
  //         if (type == 'json') {
  //           console.log(asset.name);
  //           console.log(id);
  //           console.log();
  //         }
  //         if (asset.name[0] == 'p') {
  //           return 'assets/projects/' + id + `/[name]` + `[extname]`;
  //         } else if (asset.name[0] == 'd') {
  //           return 'assets/designs/' + id + `/[name]` + `[extname]`;
  //         } else {
  //           return 'assets/' + `[name]` + `[extname]`;
  //         }
  //       },
  //     },
  //   },
  // },
})
