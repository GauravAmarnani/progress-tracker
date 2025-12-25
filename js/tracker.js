document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tracker");
  const progress = JSON.parse(localStorage.getItem("study-progress")) || {};

  function createTracker() {
    studyData.topics.forEach(topic => {
      const card = document.createElement("section");
      card.className = "card";

      const header = document.createElement("h2");
      header.textContent = topic.name;
      header.style.cursor = "pointer";

      const topicBody = document.createElement("div");
      topicBody.style.display = "none";

      header.onclick = () => {
        topicBody.style.display =
          topicBody.style.display === "none" ? "block" : "none";
      };

      card.appendChild(header);

      topic.subtopics.forEach(sub => {
        const subHeader = document.createElement("h3");
        subHeader.textContent = sub.name;
        subHeader.style.cursor = "pointer";

        const subBody = document.createElement("div");
        subBody.style.marginLeft = "16px";
        subBody.style.display = "none";

        subHeader.onclick = () => {
          subBody.style.display =
            subBody.style.display === "none" ? "block" : "none";
        };

        sub.items.forEach(item => {
          const row = document.createElement("div");
          row.className = "item";

          const isDone = progress[item.id];
          if (isDone) row.classList.add("done");

          row.textContent = `${item.name} — ${item.minutes} min`;

          row.onclick = (e) => {
            e.stopPropagation(); // stop collapsing
            if (progress[item.id]) {
              delete progress[item.id];
              row.classList.remove("done");
            } else {
              const date = prompt(
                "Enter date (YYYY-MM-DD):",
                new Date().toISOString().slice(0, 10)
              );
              if (!date) return;
              progress[item.id] = {
                done: true,
                date,
                minutes: item.minutes
              };
              row.classList.add("done");
            }
            localStorage.setItem("study-progress", JSON.stringify(progress));
          };

          subBody.appendChild(row);
        });

        topicBody.appendChild(subHeader);
        topicBody.appendChild(subBody);
      });

      card.appendChild(topicBody);
      container.appendChild(card);
    });
  }

  createTracker();
});
