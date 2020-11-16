import { ArticleList } from "./articles/ArticleList.js";
import { EventList } from "./events/EventList.js";
import { MessageList } from "./messages/MessageList.js";
import { Nav } from "./navigation/Nav.js";

export const Nutshell = () => {
  // Render all your UI components here
  Nav();
  MessageList();
  ArticleList();
  EventList();
};
