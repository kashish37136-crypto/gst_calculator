# GST Price Calculator

A sleek, modern, and responsive web application designed to help businesses and individuals calculate the base price of an item from a GST-inclusive amount, subtract a discount, and automatically re-apply the 18% GST to find the final price.

## ✨ Features

- **Extract Base Price**: Instantly calculates the original base price from a total amount that already includes 18% GST.
- **Apply Discounts**: Seamlessly subtract discounts or arbitrary amounts from the base price.
- **Recalculation**: Automatically recalculates the new 18% GST and final price point.
- **Interactive UI**: Features a 3-step dynamic flow with a premium dark-themed "glassmorphism" design, animated background blobs, and smooth transitions.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices.
- **Math Breakdown**: Includes a dedicated page detailing the mathematical formula used behind the scenes.

## 🛠️ Technology Stack

- **HTML5**: For semantic structure and accessibility.
- **Vanilla CSS3**: Custom design system using CSS variables, flexbox, glassmorphism (`backdrop-filter`), and CSS animations.
- **JavaScript (ES6)**: Client-side logic for DOM manipulation, input validation, mathematical calculations, and step-based UI transitions.

## 🧮 How It Works (The Math)

The calculator uses the following logic (based on an 18% GST rate):

1. **Extract Base Price**: `Base Price = Total Price ÷ 1.18`
2. **Apply Discount**: `New Base Price = Base Price - Subtracted Amount`
3. **Recalculate**: 
   - `Final GST = New Base Price × 0.18`
   - `Final Price = New Base Price × 1.18`

## 🚀 Getting Started

Since this is a client-side application built with pure HTML, CSS, and JavaScript, no complex installation or build steps are required.

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.
3. Start calculating!

## 📁 Project Structure

```text
/
├── index.html      # Main calculator interface
├── about.html      # Information about the tool
├── math.html       # Explanation of the mathematical formulas
├── style.css       # Global stylesheet (variables, components, animations)
└── script.js       # Calculator logic and state management
```

## 👨‍💻 Author

Created by **Ashish Kumar**
