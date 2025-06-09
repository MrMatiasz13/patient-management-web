type screeningTest = {
  title: string;
  items: string[];
  color: "blue" | "green" | "orange" | "red";
};

export const section3yo: screeningTest = {
  title: "Niebieski - 3 lata",
  items: ["Pokaż Pociąg.", "Pokaż ucho misia."],
  color: "blue",
};

export const section4yo: screeningTest = {
  title: "Zielony - 4 lata",
  items: ["Pokaż czym się je zupę.", "Pokaż pojemnik na sól."],
  color: "green",
};

export const section5yo: screeningTest = {
  title: "Pomarańczowy - 5 lata",
  items: [
    "Pokaż zwierzę, które mieszka w zoo i na tym obrazku jest największe.",
    "Pokaż zwierzę w paski, które przypomina konia.",
  ],
  color: "orange",
};

export const section6yo: screeningTest = {
  title: "Czerwony - 6 lata",
  items: [
    "Pokaż największe nożyczki, a potem nożyczki z żółtą rączką.",
    "Wskaż kredkę, która leży pomiędzy czerwoną a zieloną kredką.",
  ],
  color: "red",
};
