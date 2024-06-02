(function() {
    let template = document.createElement("template");
    template.innerHTML = `
        <style>
            .multi-select-container {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .multi-select-container select {
                padding: 8px;
                font-size: 14px;
                height: 150px;
                width: 200px;
            }
            .multi-select-container button {
                padding: 8px;
                font-size: 14px;
            }
        </style>
        <div class="multi-select-container">
            <select id="multiSelect" multiple></select>
            <button id="submitButton">Enviar</button>
        </div>
    `;

    class MultiSelectWidget extends HTMLElement {
        constructor() {
            super();
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.content.cloneNode(true));

            this.submitButton = shadowRoot.getElementById("submitButton");
            this.submitButton.addEventListener("click", () => {
                this._submit();
            });
        }

        connectedCallback() {
            this._renderOptions();
        }

        static get observedAttributes() {
            return ["options"];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "options") {
                this._renderOptions();
            }
        }

        _renderOptions() {
            const selectElement = this.shadowRoot.getElementById("multiSelect");
            const options = JSON.parse(this.getAttribute("options") || "[]");

            // Limpiar opciones existentes
            selectElement.innerHTML = "";

            // Agregar nuevas opciones
            options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                selectElement.appendChild(optionElement);
            });
        }

        _submit() {
            const selectElement = this.shadowRoot.getElementById("multiSelect");
            const selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);

            this.dispatchEvent(new CustomEvent("onSubmit", {
                detail: {
                    selectedOptions: selectedOptions
                }
            }));
        }

        getInfo() {
            const selectElement = this.shadowRoot.getElementById("multiSelect");
            const selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);

            return {
                selectedOptions: selectedOptions,
                totalOptions: selectElement.options.length,
                allOptions: Array.from(selectElement.options).map(option => option.value)
            };
        }

        setOptions(value) {
            this.setAttribute("options", JSON.stringify(value));
        }
    }

    customElements.define("com-custom-multiselect", MultiSelectWidget);
})();