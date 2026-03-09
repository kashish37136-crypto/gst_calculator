// =============================================
// GST Price Calculator — Client-Side Logic
// =============================================

(() => {
    "use strict";

    // --- Constants ---
    const GST_RATE = 0.18;
    const GST_MULTIPLIER = 1 + GST_RATE; // 1.18

    // --- DOM Elements ---
    const gstPriceInput = document.getElementById("gst-price");
    const subtractInput = document.getElementById("subtract-amount");
    const btnCalculate = document.getElementById("btn-calculate");
    const btnSubtract = document.getElementById("btn-subtract");
    const btnReset = document.getElementById("btn-reset");

    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");
    const step3 = document.getElementById("step-3");

    const error1 = document.getElementById("error-1");
    const error2 = document.getElementById("error-2");

    // Breakdown outputs
    const outGstPrice = document.getElementById("out-gst-price");
    const outBasePrice = document.getElementById("out-base-price");
    const outGstAmount = document.getElementById("out-gst-amount");

    // Result outputs
    const resOriginalBase = document.getElementById("res-original-base");
    const resSubtract = document.getElementById("res-subtract");
    const resNewBase = document.getElementById("res-new-base");
    const resGst = document.getElementById("res-gst");
    const resFinal = document.getElementById("res-final");

    // --- State ---
    let basePrice = 0;

    // --- Utilities ---

    /** Format a number to 2 decimal places with ₹ prefix */
    function formatCurrency(value) {
        return "₹" + value.toFixed(2);
    }

    /** Parse user input to a positive number. Returns NaN on failure. */
    function parsePositiveNumber(str) {
        const trimmed = str.trim();
        if (trimmed === "") return NaN;
        const num = Number(trimmed);
        if (isNaN(num) || num < 0) return NaN;
        return num;
    }

    /** Clear error state on an input */
    function clearError(input, errorEl) {
        input.classList.remove("input-error");
        errorEl.textContent = "";
    }

    /** Set error state on an input */
    function setError(input, errorEl, message) {
        input.classList.add("input-error");
        errorEl.textContent = message;
        input.focus();
    }

    /** Show a step with animation */
    function showStep(stepEl) {
        stepEl.classList.remove("hidden");
        stepEl.classList.add("fade-in");
    }

    /** Hide a step */
    function hideStep(stepEl) {
        stepEl.classList.add("hidden");
        stepEl.classList.remove("fade-in");
    }

    // --- Step 1: Calculate Base Price ---
    function handleCalculate() {
        clearError(gstPriceInput, error1);

        const gstInclusivePrice = parsePositiveNumber(gstPriceInput.value);

        // Validate
        if (isNaN(gstInclusivePrice)) {
            setError(gstPriceInput, error1, "Please enter a valid positive number.");
            return;
        }
        if (gstInclusivePrice === 0) {
            setError(gstPriceInput, error1, "Price must be greater than zero.");
            return;
        }

        // Calculate base price: Base Price = GST Included Price / 1.18
        basePrice = gstInclusivePrice / GST_MULTIPLIER;
        const gstAmount = gstInclusivePrice - basePrice;

        // Populate breakdown
        outGstPrice.textContent = formatCurrency(gstInclusivePrice);
        outBasePrice.textContent = formatCurrency(basePrice);
        outGstAmount.textContent = formatCurrency(gstAmount);

        // Transition to Step 2
        hideStep(step1);
        showStep(step2);
        subtractInput.value = "";
        clearError(subtractInput, error2);
        subtractInput.focus();
    }

    // --- Step 2: Subtract & Recalculate ---
    function handleSubtract() {
        clearError(subtractInput, error2);

        const subtractValue = parsePositiveNumber(subtractInput.value);

        // Validate
        if (isNaN(subtractValue)) {
            setError(subtractInput, error2, "Please enter a valid positive number.");
            return;
        }
        if (subtractValue > basePrice) {
            setError(
                subtractInput,
                error2,
                `Amount cannot exceed the base price (${formatCurrency(basePrice)}).`
            );
            return;
        }

        // Calculate new values
        const newBasePrice = basePrice - subtractValue;
        const gstOnNewPrice = newBasePrice * GST_RATE;
        const finalPrice = newBasePrice * GST_MULTIPLIER;

        // Populate result card
        resOriginalBase.textContent = formatCurrency(basePrice);
        resSubtract.textContent = "−" + formatCurrency(subtractValue).slice(1); // minus sign
        resNewBase.textContent = formatCurrency(newBasePrice);
        resGst.textContent = formatCurrency(gstOnNewPrice);
        resFinal.textContent = formatCurrency(finalPrice);

        // Transition to Step 3
        hideStep(step2);
        showStep(step3);
    }

    // --- Reset ---
    function handleReset() {
        basePrice = 0;
        gstPriceInput.value = "";
        subtractInput.value = "";
        clearError(gstPriceInput, error1);
        clearError(subtractInput, error2);
        hideStep(step2);
        hideStep(step3);
        showStep(step1);
        gstPriceInput.focus();
    }

    // --- Event Listeners ---
    btnCalculate.addEventListener("click", handleCalculate);
    btnSubtract.addEventListener("click", handleSubtract);
    btnReset.addEventListener("click", handleReset);

    // Allow Enter key to submit each step
    gstPriceInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleCalculate();
    });

    subtractInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleSubtract();
    });

    // Clear errors on input change
    gstPriceInput.addEventListener("input", () => clearError(gstPriceInput, error1));
    subtractInput.addEventListener("input", () => clearError(subtractInput, error2));
})();
