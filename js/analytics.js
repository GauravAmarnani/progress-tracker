const progress = getProgress();

/*
  Aggregations:
  - topicTotals: total minutes per topic
  - dailyTotals: total minutes per day (YYYY-MM-DD)
*/
const topicTotals = {};
const dailyTotals = {};

// --------------------
// AGGREGATE DATA
// --------------------
studyData.topics.forEach(topic => {
  let topicSum = 0;

  topic.subtopics.forEach(sub =>
    sub.items.forEach(item => {
      const entry = progress[item.id];
      if (entry && entry.done) {
        topicSum += entry.minutes;

        if (!dailyTotals[entry.date]) {
          dailyTotals[entry.date] = 0;
        }
        dailyTotals[entry.date] += entry.minutes;
      }
    })
  );

  topicTotals[topic.name] = topicSum;
});

// --------------------
// BAR CHART (TOPIC-WISE)
// --------------------
new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: Object.keys(topicTotals),
    datasets: [{
      label: "Minutes Completed",
      data: Object.values(topicTotals),
      backgroundColor: "#2563eb"
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  }
});

// --------------------
// PIE CHART (DISTRIBUTION)
// --------------------
new Chart(document.getElementById("topicPieChart"), {
  type: "pie",
  data: {
    labels: Object.keys(topicTotals),
    datasets: [{
      data: Object.values(topicTotals),
      backgroundColor: [
        "#3b82f6",
        "#22c55e",
        "#f59e0b",
        "#a855f7",
        "#ef4444"
      ]
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "left",          // ✅ move legend to left
        align: "center",
        labels: {
          boxWidth: 14,
          padding: 16,
          font: {
            size: 13
          }
        }
      }
    }
  }
});

// --------------------
// LINE CHART (DAILY TREND – UDEMY STYLE)
// --------------------
const sortedDates = Object.keys(dailyTotals).sort(
  (a, b) => new Date(a) - new Date(b)
);

new Chart(document.getElementById("lineChart"), {
  type: "line",
  data: {
    labels: sortedDates.map(d =>
      new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short"
      })
    ),
    datasets: [{
      label: "Time Invested (mins)",
      data: sortedDates.map(d => dailyTotals[d]),
      borderColor: "#7c3aed",
      backgroundColor: "rgba(124,58,237,0.2)",
      tension: 0.35,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: "Time Invested (mins)"
        }
      },
      x: {
        title: {
          display: true,
          text: "Date"
        }
      }
    }
  }
});


// --------------------
// CSV EXPORT (DAILY TOTALS)
// --------------------
document.getElementById("exportCsv").onclick = () => {
  let csv = "Date,Minutes Studied\n";

  sortedDates.forEach(date => {
    csv += `${date},${dailyTotals[date]}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "daily-study-progress.csv";
  a.click();
};


// -------- PER TOPIC COMPLETION PIE CHARTS --------
const topicContainer = document.getElementById("topicPies");

studyData.topics.forEach(topic => {
  let completed = 0;
  let total = 0;

  topic.subtopics.forEach(sub => {
    sub.items.forEach(item => {
      total++;
      if (progress[item.id]) completed++;
    });
  });

  const wrapper = document.createElement("div");
  wrapper.style.marginBottom = "30px";

  const title = document.createElement("h3");
  title.textContent = topic.name;
  wrapper.appendChild(title);

  const canvas = document.createElement("canvas");
  wrapper.appendChild(canvas);

  topicContainer.appendChild(wrapper);

  new Chart(canvas, {
    type: "pie",
    data: {
      labels: ["Completed", "Remaining"],
      datasets: [{
        data: [completed, total - completed],
        backgroundColor: ["#22c55e", "#e5e7eb"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
});


