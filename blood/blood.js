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
    const form = document.getElementById("donation-form");
    const outputContainer = document.getElementById("output");

    // Handle form submission
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Collect form data
            const name = document.getElementById("name").value;
            const age = document.getElementById("age").value;
            const bloodGroup = document.getElementById("blood-group").value;
            const contactNumber = document.getElementById("contact-number").value;
            const location = document.getElementById("location").value;
            const photoInput = document.getElementById("photo-input").files[0];

            // Store data in localStorage
            const reader = new FileReader();
            reader.onload = function () {
                const donationData = {
                    name: name,
                    age: age,
                    bloodGroup: bloodGroup,
                    contactNumber: contactNumber,
                    location: location,
                    image: reader.result,
                };

                // Save multiple donation entries in localStorage
                let donations = JSON.parse(localStorage.getItem("donations")) || [];
                donations.push(donationData);
                localStorage.setItem("donations", JSON.stringify(donations));

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
        const donations = JSON.parse(localStorage.getItem("donations")) || [];
        displayDonations(donations);
    }

    // Function to display donations
    function displayDonations(donations) {
        outputContainer.innerHTML = ""; // Clear previous content
        donations.forEach((donor) => {
            const card = document.createElement("div");
            card.className = "output-card";

            const image = donor.image ? `<img src="${donor.image}" alt="Donor Image" class="output-image">` : "";

            const details = `
                <div>
                    ${image}
                    <h3>${donor.name}</h3>
                    <p><strong>Age:</strong> ${donor.age}</p>
                    <p><strong>Blood Group:</strong> ${donor.bloodGroup}</p>
                    <p><strong>Contact Number:</strong> ${donor.contactNumber}</p>
                    <p><strong>Location:</strong> ${donor.location}</p>
                </div>
            `;

            card.innerHTML = details;
            outputContainer.appendChild(card);
        });

        if (donations.length === 0) {
            outputContainer.innerHTML = "<p>No matching donations found.</p>";
        }
    }
});
