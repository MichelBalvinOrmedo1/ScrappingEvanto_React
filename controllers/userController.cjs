const puppeteer = require("puppeteer");

async function scrapeEnvato(keyword) {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
    ],
  });

  const page = await browser.newPage();

  await page.goto("https://elements.envato.com/es/");

  await page.setRequestInterception(true);

  // Ignorar las solicitudes de imagen y fuente para mejorar el rendimiento
  page.on("request", (request) => {
    if (["image", "font"].includes(request.resourceType())) {
      request.abort();
    } else {
      request.continue();
    }
  });

  const input = await page.waitForSelector("#autosuggest");
  await input.type(keyword);

  const button = await page.waitForSelector(
    "#app > div.Pwa91aRM > main > div > div > div.tt9Ej34g > div.S51DHinX > div > div > div > form > button",
    { visible: true }
  );
  await button.click();

  // Esperar a que la página termine de cargar
  await page.waitForSelector(".GsBXsKvH .u4c2Cda9");

  const jsonData = await page.evaluate(() => {
    const trendsList = document.querySelectorAll(
      ".GsBXsKvH > .u4c2Cda9 div h3 a"
    );

    const url = "https://elements.envato.com";

    const jsonData = [];

    for (let i = 0; i < trendsList.length; i++) {
      const title = trendsList[i].innerHTML;
      const dive = url + trendsList[i].getAttribute("href");

      let containerData = [];
      let lista;
      if (title === "Fotos") {
        lista = document.querySelectorAll(
          `#app > div.Pwa91aRM > main > div > div.GsBXsKvH > div:nth-child(${
            i + 1
          }) >  .tXwhn5Zg > div`
        );
      } else {
        lista = document.querySelectorAll(
          `#app > div.Pwa91aRM > main > div > div.GsBXsKvH > div:nth-child(${
            i + 1
          }) ul > li div a[data-test-selector="item-card-user-profile-link"]`
        );
      }
      const listaArray = Array.from(lista).map((item) => {
        if (title === "Fotos") {
          const autor = item.querySelector(".Ago_n9Jb a").innerHTML;
          const autorurl = item
            .querySelector(".Ago_n9Jb a")
            .getAttribute("href");
          return { author: autor, authorUrl: url + autorurl };
        } else {
          const autor = item.innerHTML;
          const autorurl = item.getAttribute("href");
          return { author: autor, authorUrl: autorurl };
        }
      });

      const descripcion = document.querySelectorAll(
        `#app > div.Pwa91aRM > main > div > div.GsBXsKvH > div:nth-child(${
          i + 1
        }) ul > li div a[class*="_MwuC0KD"]`
      );
      let descripcionArray;
      if (title === "Fotos") {
        descripcionArray = Array.from(lista).map((item) => {
          const descripcion = item.querySelector(".LjIVoz0l").innerHTML;
          const descripcionurl =
            url + item.querySelector(".SZBxAOrq").getAttribute("href");
          return { description: descripcion, descriptionUrl: descripcionurl };
        });
      } else {
        descripcionArray = Array.from(descripcion).map((item) => {
          const descripcion = item.getAttribute("title");
          const descripcionurl = url + item.getAttribute("href");
          return { description: descripcion, descriptionUrl: descripcionurl };
        });
      }

      let imagenArray;
      if (title === "Fotos") {
        imagenArray = Array.from(lista).map((item) => {
          const src = item.querySelector(".NgtXrCQY  img").getAttribute("src");
          return { src: src };
        });
      } else if (
        title === "Vídeos de stock" ||
        title === "Plantillas de vídeo"
      ) {
        const imagen = document.querySelectorAll(
          `#app > div.Pwa91aRM > main > div > div.GsBXsKvH > div:nth-child(${
            i + 1
          }) > ul > li> div > div.F_mg954K.LpyZHUjX > div > div.o1ZyM67O`
        );
        imagenArray = Array.from(imagen).map((item) => {
          const src = item.querySelector("img").getAttribute("src");
          return { src: src };
        });
      } else {
        const imagen = document.querySelectorAll(
          `#app > div.Pwa91aRM > main > div > div.GsBXsKvH > div:nth-child(${
            i + 1
          }) > ul > li> div > div.NgtXrCQY.Y0GQEttH  .MY02g2dt`
        );
        imagenArray = Array.from(imagen).map((item) => {
          const src = item.querySelector("img").getAttribute("src");
          return { src: src };
        });
      }

      containerData = {
        authors: listaArray,
        descriptions: descripcionArray,
        images: imagenArray,
      };

      const data = { title: title, url: dive, data: containerData };
      jsonData.push(data);
    }

    return jsonData;
  });

  await browser.close();
  return jsonData;
}

const userController = async (req, res) => {
  try {
    const { keyword } = req.query; // Obtener el parámetro de la consulta
    const data = await scrapeEnvato(keyword); // Pasar el parámetro a la función scrapeEnvato
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  userController,
};
