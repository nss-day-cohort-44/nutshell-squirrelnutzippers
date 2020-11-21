import { ArticleList } from "./articles/ArticleList.js";
import { setDragDrop } from "./dragdrop.js";
import { EventList } from "./events/EventList.js";
import { FriendList } from "./friends/FriendList.js";
import { MessageList } from "./messages/MessageList.js";
import { Nav } from "./navigation/Nav.js";
import { TaskList } from "./tasks/TaskList.js";
import { getUsers } from "./users/UserProvider.js";
import { WeatherCard } from "./weather/WeatherCard.js";
import { WeatherList } from "./weather/WeatherList.js";

export const Nutshell = () => {
  // Render all your UI components here
  getUsers().then(() => {
    Nav();
    TaskList();
    FriendList();
    EventList();
    ArticleList();
    MessageList();
    WeatherList();
    WeatherCard();
    setDragDrop();
  });
};
