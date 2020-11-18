import { ArticleList } from "./articles/ArticleList.js";
import { EventList } from "./events/EventList.js";
import { FriendList } from "./friends/FriendList.js";
import { MessageList } from "./messages/MessageList.js";
import { Nav } from "./navigation/Nav.js";
import { TaskList } from "./tasks/TaskList.js";
import { getUsers } from "./users/UserProvider.js";

export const Nutshell = () => {
  // Render all your UI components here
  getUsers().then(() => {
    Nav();
    TaskList();
    FriendList();
    EventList();
    ArticleList();
    MessageList();
  });
};
