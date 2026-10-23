// Read the job number from the address, for example job-detail.html?id=3
const params = new URLSearchParams(window.location.search);
const jobId = Number(params.get("id"));
const box = document.getElementById("detail");

const job = jobs.find(function (j) { return j.id === jobId; });

if (!job) {
  box.innerHTML =
    '<div class="detail-card"><h1>Job not found</h1>' +
    "<p>This job does not exist. Go back and choose one from the list.</p>" +
    '<a href="jobs.html" class="btn">See all jobs</a></div>';
  document.title = "Job not found | HustleHub";
} else {
  document.title = job.title + " | HustleHub";
  const where = job.remote ? "Remote" : "On-site";
  const skills = job.skills.map(function (s) { return "<li>" + s + "</li>"; }).join("");

  box.innerHTML =
    '<div class="detail-layout">' +
      '<article class="detail-card">' +
        "<h1>" + job.title + "</h1>" +
        '<p class="company">' + job.company + " · " + job.country + " · " + where + "</p>" +
        '<p class="tags"><span>' + job.type + "</span><span>" + job.level + "</span><span>" + job.category + "</span></p>" +
        "<h2>The task</h2>" +
        "<p>" + job.deliverables + "</p>" +
        "<h2>Skills needed</h2>" +
        '<ul class="skills">' + skills + "</ul>" +
        '<div class="warning"><strong>Stay safe.</strong> Never pay money to get this job. ' +
        "If the poster asks for payment, report the listing.</div>" +
      "</article>" +
      '<aside class="detail-card pay-box">' +
        '<p class="mini-title">Pay</p>' +
        '<p class="pay">' + job.pay + "</p>" +
        '<p class="mini-title">Deadline</p>' +
        "<p><strong>" + job.deadline + "</strong></p>" +
        '<button type="button" class="btn" id="apply-btn">Apply (demo)</button>' +
        '<button type="button" class="btn btn-outline" id="report-btn">Report this job</button>' +
        '<p class="demo-msg" id="detail-msg"></p>' +
      "</aside>" +
    "</div>";

  const msg = document.getElementById("detail-msg");
  document.getElementById("apply-btn").addEventListener("click", function () {
    msg.textContent = "Demo only: applications need a backend.";
  });
  document.getElementById("report-btn").addEventListener("click", function () {
    msg.textContent = "Demo only: reports need a backend.";
  });
}