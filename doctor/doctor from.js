function previewPhoto(event) {
    const photoInput = event.target;
    const photoPreview = document.getElementById("photo-preview");
    const file = photoInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        photoPreview.src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("doctor-form");
    const outputContainer = document.getElementById("output");
    const searchBar = document.getElementById("search-bar"); // Add search bar in HTML if needed

    // Handle form submission
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Collect form data
            const doctorName = document.getElementById("doctor-name").value;
            const specialization = document.getElementById("specialization").value;
            const education = document.getElementById("education").value;
            const workplace = document.getElementById("workplace").value;
            const description = document.getElementById("description").value;
            const photoInput = document.getElementById("photo-input").files[0];

            // Store data in localStorage
            const reader = new FileReader();
            reader.onload = function () {
                const doctorData = {
                    name: doctorName,
                    specialization: specialization,
                    education: education,
                    workplace: workplace,
                    description: description,
                    photo: reader.result,
                };

                // Save multiple doctor entries in localStorage
                let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
                doctors.push(doctorData);
                localStorage.setItem("doctors", JSON.stringify(doctors));

                // Redirect to result page
                window.location.href = "result.html";
            };

            if (photoInput) {
                reader.readAsDataURL(photoInput);
            } else {
                alert("Please upload a photo.");
            }
        });
    }

    // Load data on the result page
    if (outputContainer) {
        const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
        displayDoctors(doctors);

        // Add search functionality
        if (searchBar) {
            searchBar.addEventListener("input", (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredDoctors = doctors.filter((doctor) => {
                    return (
                        doctor.name.toLowerCase().includes(searchTerm) ||
                        doctor.specialization.toLowerCase().includes(searchTerm)
                    );
                });
                displayDoctors(filteredDoctors);
            });
        }
    }

    // Function to display doctors
    function displayDoctors(doctors) {
        outputContainer.innerHTML = ""; // Clear previous content
        doctors.forEach((doctor) => {
            const card = document.createElement("div");
            card.className = "output-card";

            const image = document.createElement("img");
            image.src = doctor.photo;
            image.alt = "Doctor Photo";

            const details = `
                <div>
                    <h3>${doctor.name}</h3>
                    <p><strong>Specialization:</strong> ${doctor.specialization}</p>
                    <p><strong>Education:</strong> ${doctor.education}</p>
                    <p><strong>Workplace:</strong> ${doctor.workplace}</p>
                    <p><strong>Description:</strong> ${doctor.description}</p>
                </div>
            `;

            card.appendChild(image);
            card.innerHTML += details;
            outputContainer.appendChild(card);
        });

        if (doctors.length === 0) {
            outputContainer.innerHTML = "<p>No matching doctors found.</p>";
        }
    }
});
