// ===== Numbers strip: counted from the sample data =====
const categories = [];
jobs.forEach(function (job) {
  if (!categories.includes(job.category)) {
    categories.push(job.category);
  }
});

const remoteJobs = jobs.filter(function (job) { return job.remote; });

document.getElementById("stat-jobs").textContent = jobs.length;
document.getElementById("stat-categories").textContent = categories.length;
document.getElementById("stat-remote").textContent = remoteJobs.length;

// ===== Featured jobs: the first 3 jobs =====
const featuredList = document.getElementById("job-list");

jobs.slice(0, 3).forEach(function (job) {
  const where = job.remote ? "Remote" : "On-site";
  const skills = job.skills
    .map(function (s) { return "<li>" + s + "</li>"; })
    .join("");

  featuredList.innerHTML +=
    '<article class="job-card">' +
      "<h3>" + job.title + "</h3>" +
      '<p class="company">' + job.company + " · " + job.country + " · " + where + "</p>" +
      '<p class="tags"><span>' + job.type + "</span><span>" + job.level + "</span><span>" + job.category + "</span></p>" +
      '<ul class="skills">' + skills + "</ul>" +
      '<p class="pay">' + job.pay + "</p>" +
      '<p class="deadline">Deadline: ' + job.deadline + "</p>" +
      '<a href="job-detail.html?id=' + job.id + '" class="btn btn-outline">View details</a>' +
    "</article>";
});