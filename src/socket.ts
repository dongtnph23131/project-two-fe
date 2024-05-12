import { io } from "socket.io-client";
import uri_Api from "./config/uri-api";
export const socket: any = io(`${uri_Api()}`);
