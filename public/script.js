// Mobile menu toggle
let menuList = document.getElementById("menuList");

function toggleMenu() {
    if (menuList.style.display === "flex") {
        menuList.style.display = "none";
    } else {
        menuList.style.display = "flex";
    }
}

// FAQ toggle
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});

// Form submission
document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const formMessage = document.getElementById('formMessage');

    // Validate name
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        formMessage.textContent = 'Invalid name. Please use letters and spaces only.';
        return;
    }

    // Validate phone number
    if (!/^\d{10}$/.test(phone)) {
        formMessage.textContent = 'Invalid phone number. Must be 10 digits.';
        return;
    }

    formMessage.textContent = 'Submitting...';

    try {
        // Updated fetch URL to your Render backend URL
        const response = await fetch('https://your-backend-service.onrender.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone })
        });

        if (response.ok) {
            formMessage.textContent = 'Details submitted successfully!';
            document.getElementById('appointmentForm').reset();
        } else {
            formMessage.textContent = 'Error submitting details. Please try again.';
        }
    } catch (error) {
        formMessage.textContent = 'Network error. Please try again later.';
        console.error(error);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
