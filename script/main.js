<!--Group 10:-->
<!--Name: Sumit Jain (100890788)-->
<!--Name: Yash (100892788)-->
<!--Date of completion: 26-01-2024-->


const teamMembersMoreDetails = {
    "11": "Meet Sumit Jain, our dedicated team member specializing in software development. With a keen eye for detail, Sumit crafts efficient and scalable solutions. His expertise lies in full-stack development, ensuring our projects are not only functional but also deliver an exceptional user experience.",
    "12": "Introducing Yash, a talented team member who specializes in design and user interface. Yash elevates creativity by transforming concepts into breathtakingly beautiful reality. His expertise in UX/UI design guarantees that our products surpass customer expectations.",
};

const myProjects = [
    {
        title: "Culinary Workshop",
        image: "food.jpg",
        description: "Savor the art of cooking at Harmony Hub's Culinary Workshop – where flavors, skills, and community come together deliciously."
    },
    {
        title: "Fitness Trail",
        image: "sport.jpeg",
        description: "Embark on a fitness journey at Harmony Hub's Fitness Trail—an invigorating outdoor space for health enthusiasts to thrive and connect."
    },
    {
        title: "Meditation Trail",
        image: "meditation.jpg",
        description: "Discover serenity at Harmony Hub's meditation Trail – a tranquil sanctuary for inner peace and mindfulness. Join us in calm reflection."
    },
    {
        title: "Book Exchange Program",
        image: "library.jpg",
        description: "Harmony Hub's Book Exchange: Share the joy of reading! Swap, borrow, and discover new stories in our community hub"
    },
    {
        title: "Community Recycling Program",
        image: "project.jpg",
        description: "Harmony Hub's Community Recycling Program: Join us in creating a sustainable future through collective recycling efforts. Together, we make a positive impact!"
    },

]

$(function () {
    // Add new "Careers" link.
    const careersLink = '<li class="nav-item"><a class="nav-link" aria-current="page" href="#">Careers</a></li>';
    $(".top-navbar .navbar-nav").append(careersLink);

    // Change "Blog" link text to "News".
    $(".top-navbar .navbar-nav").find("#blog a").text("News");

    // Dynamically add footer navbar
    const footerNavBar = `<nav class="bottom-navbar navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="../privacy.html">Privacy</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../tos.html">Terms of Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../contactus.html">Contact us</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`;

    $('body').append(footerNavBar);


    $(".team-table td").on("click", function () {
        const idString = $(this).closest("tr").attr("id");
        if (idString) {
            const id = idString.split("-")[1];
            $("#exampleModal").find(".modal-body").text(teamMembersMoreDetails[id]);
            $("#exampleModal").modal('show');
        }
    })
    const myCarousel = document.querySelector('.carousel')
    if (myCarousel) {
        const carousel = new bootstrap.Carousel(myCarousel, {
            interval: 2000,
            wrap: false
        });
    }

    $("#submit-query").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation()
        const username = $("#contact-form-control").find("#username").val();
        const email = $("#contact-form-control").find("#email").val();
        const subject = $("#contact-form-control").find("#subject").val();
        const message = $("#contact-form-control").find("#message").val();
        let errorMessage = '';

        if (isEmpty(username)) {
            $("#contact-form-control").find("#username");
            errorMessage += "Username cannot be empty";
        }
        if (isEmpty(email)) {
            $("#contact-form-control").find("#email");
            errorMessage += "<br> Email cannot be empty";
        }
        if (isEmpty(subject)) {
            $("#contact-form-control").find("#subject");
            errorMessage += "<br> Subject cannot be empty";
        }
        if (isEmpty(message)) {
            $("#contact-form-control").find("#message");
            errorMessage += "<br> Message cannot be empty";
        }

        if (errorMessage !== '') {
            $("#contact-form-control").addClass('was-validated');
            return;
        } else {
            let countdown = 5;
            let messageString = 'Thank you for contacting us. We have got your query with following information and we will get back to you soon. <br><br>'
            messageString += getMessageItemItem('Username', username);
            messageString += getMessageItemItem('Email', email);
            messageString += getMessageItemItem('Subject', subject);
            messageString += getMessageItemItem('Message', message);
            messageString += '<div class="countdown">Redirecting in ' + countdown + ' ...</div>'
            $('.modal').modal('show');
            $('.modal').find('.modal-body').html(messageString);
            $("#contact-form-control").removeClass('was-validated');
            $("#contact-form-control").trigger('reset');
            const interval = setInterval(function () {
                $('.modal').find('.modal-body').find('.countdown').html(`Redirecting in ${countdown--} ...`);
                if (countdown <= 0) {
                    clearInterval(interval);
                    window.location = 'index.html';
                }
            }, 1000);
        }
    });

    // Add Project cards.
    const projectsContainer = $(".projects-container");
    if (projectsContainer.length > 0) {
        const template = `<div class="col-lg-4"><div class="card project-card" style="width: 18rem;">
        <img class="card-img-top" src="{card_image}" alt="{card_title}">
        <div class="card-body">
          <h5 class="card-title">{card_title}</h5>
          <p class="card-text">{card_description}</p>
        </div>
      </div></div>`;
        const projects = myProjects.map((project) => template.replace(/{card_title}/g, project.title)
            .replace('{card_description}', project.description).replace('{card_image}', 'images/' + project.image));
        projectsContainer.find('.container').append($('<div class="row">').html(projects));
    }
});

const isEmpty = (value) => value === '';
const getMessageItemItem = (label, value) => {
    return `<div class="filled-info"><label>${label}</label>: <span>${value}</span></div>`;
}
