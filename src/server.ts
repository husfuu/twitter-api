import App from "@/app"
import IndexRoute from "@/api/routes/index.route"

const app = new App([
    new IndexRoute()
]);

app.listen();