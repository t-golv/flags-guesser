/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import { Router } from "@solidjs/router";
import { routes } from "./Routes";
const root = document.getElementById("root");

render(() => <Router base="/flags-guesser">{routes}</Router>, root!);
