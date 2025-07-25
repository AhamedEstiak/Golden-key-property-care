// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.background = "#fff"
    navbar.style.backdropFilter = "none"
  }
})

// Contact form handling
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const formObject = {}
  formData.forEach((value, key) => {
    formObject[key] = value
  })

  // Simple validation
  if (!formObject.name || !formObject.email || !formObject.message) {
    showNotification("Please fill in all required fields.", "error")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formObject.email)) {
    showNotification("Please enter a valid email address.", "error")
    return
  }

  // Simulate form submission
  const submitButton = this.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent
  submitButton.textContent = "Sending..."
  submitButton.disabled = true

  // Simulate API call
  setTimeout(() => {
    showNotification("Thank you! Your message has been sent successfully. We'll get back to you soon.", "success")
    contactForm.reset()
    submitButton.textContent = originalText
    submitButton.disabled = false
  }, 2000)
})

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#2c5530" : type === "error" ? "#dc3545" : "#007bff"};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `

  // Add animation styles
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .notification-close:hover {
            opacity: 0.8;
        }
    `

  if (!document.querySelector("#notification-styles")) {
    style.id = "notification-styles"
    document.head.appendChild(style)
  }

  // Add to page
  document.body.appendChild(notification)

  // Close button functionality
  const closeButton = notification.querySelector(".notification-close")
  closeButton.addEventListener("click", () => {
    notification.remove()
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".service-card, .testimonial-card, .about-text, .contact-info")

  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
    observer.observe(el)
  })
})

// Add loading state to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    if (this.getAttribute("href") && this.getAttribute("href").startsWith("#")) {
      return // Skip for anchor links
    }

    // Add loading state for other buttons
    const originalText = this.textContent
    this.style.position = "relative"
    this.style.color = "transparent"

    const loader = document.createElement("div")
    loader.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        `

    this.appendChild(loader)

    setTimeout(() => {
      this.removeChild(loader)
      this.style.color = ""
    }, 1000)
  })
})

// Add spin animation for loaders
const spinStyle = document.createElement("style")
spinStyle.textContent = `
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`
document.head.appendChild(spinStyle)
