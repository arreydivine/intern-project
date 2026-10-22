// Show the jobs on the page
const jobList = document.getElementById("job-list");
const jobCount = document.getElementById("job-count");

function showJobs(list) {
  jobCount.textContent = list.length + " jobs found";
  jobList.innerHTML = "";

  list.forEach(function (job) {
    const where = job.remote ? "Remote" : "On-site";
    const skills = job.skills
      .map(function (s) { return "<li>" + s + "</li>"; })
      .join("");

    jobList.innerHTML +=
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
}

showJobs(jobs);