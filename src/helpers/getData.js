import data from "../data/data.json";

export const getData = (time) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, time);
  });
};

export const getItemByLink = (link, time) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const item = data["products"].find((e) => e.link === link);
      if (item) {
        res(item);
      } else {
        rej({
          error: "Item not found",
        });
      }
    }, time);
  });
};
