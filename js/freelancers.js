// SAMPLE DATA (demo only). These people are made up.
const freelancers = [
  { name: "Amina Tchoua", title: "Graphic Designer", country: "Cameroon",
    skills: ["Logo design", "Canva", "Photoshop"],
    bio: "Designs clean logos and social media graphics for small shops.",
    portfolio: ["Bakery logo pack", "Market poster series"] },
  { name: "Kwame Mensah", title: "Frontend Developer", country: "Ghana",
    skills: ["HTML", "CSS", "JavaScript"],
    bio: "Builds fast, mobile-friendly websites for small businesses.",
    portfolio: ["Restaurant website", "Booking page"] },
  { name: "Chidi Okafor", title: "Content Writer", country: "Nigeria",
    skills: ["Writing", "Research", "Editing"],
    bio: "Writes clear blog posts and website text in English.",
    portfolio: ["Tech blog series", "Product descriptions"] },
  { name: "Fatou Diop", title: "Translator (EN/FR)", country: "Senegal",
    skills: ["English", "French", "Proofreading"],
    bio: "Translates product pages and documents between English and French.",
    portfolio: ["Online shop translation", "User guide translation"] },
  { name: "Brian Kamau", title: "Social Media Manager", country: "Kenya",
    skills: ["Social media", "Content planning", "Canva"],
    bio: "Plans and schedules posts that help small brands grow.",
    portfolio: ["Salon campaign", "Monthly content calendar"] },
  { name: "Grace Ndong", title: "Virtual Assistant", country: "Cameroon",
    skills: ["Excel", "Email management", "Organization"],
    bio: "Handles emails, schedules and spreadsheets so owners save time.",
    portfolio: ["Inbox clean-up", "Product catalogue sheet"] }
];

const listBox = document.getElementById("freelancer-list");
const countBox = document.getElementById("freelancer-count");
const searchBox = document.getElementById("search");

function initials(name) {
  return name.split(" ").map(function (n) { return n[0]; }).slice(0, 2).join("").toUpperCase();
}

function showFreelancers(list) {
  countBox.textContent = list.length + " freelancers found";
  listBox.innerHTML = "";

  if (list.length === 0) {
    listBox.innerHTML = '<p class="empty">No one matches your search. Try another word.</p>';
    return;
  }

  list.forEach(function (f) {
    const skills = f.skills.map(function (s) { return "<li>" + s + "</li>"; }).join("");
    const work = f.portfolio.map(function (w) { return "<li>" + w + "</li>"; }).join("");

    listBox.innerHTML +=
      '<article class="profile-card">' +
        '<div class="profile-top">' +
          '<span class="avatar">' + initials(f.name) + "</span>" +
          "<div><h3>" + f.name + "</h3>" +
          '<p class="company">' + f.title + " · " + f.country + "</p></div>" +
        "</div>" +
        "<p>" + f.bio + "</p>" +
        '<ul class="skills">' + skills + "</ul>" +
        '<p class="mini-title">Portfolio samples</p>' +
        '<ul class="portfolio">' + work + "</ul>" +
        '<button type="button" class="btn btn-outline contact-btn">Contact (demo)</button>' +
        '<p class="demo-msg"></p>' +
      "</article>";
  });
}

// Live search while typing
searchBox.addEventListener("input", function () {
  const q = searchBox.value.trim().toLowerCase();
  const found = freelancers.filter(function (f) {
    const text = (f.name + " " + f.title + " " + f.country + " " + f.skills.join(" ")).toLowerCase();
    return text.includes(q);
  });
  showFreelancers(found);
});

// Demo contact buttons (one listener for the whole list)
listBox.addEventListener("click", function (event) {
  if (event.target.classList.contains("contact-btn")) {
    event.target.nextElementSibling.textContent = "Demo only: messaging needs a backend.";
  }
});

showFreelancers(freelancers);