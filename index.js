
const data = [
    { id: 1, title: "1 Unit", price: 10.00, dis: "10% Off" },
    { id: 2, title: "2 Unit", price: 18.00, dis: "20% Off" },
    { id: 3, title: "3 Unit", price: 24.00, dis: "30% Off" },
];

const size = (cardId) => {
    return `
        <div style="display: flex; gap: 15px; align-items:center">
            <p>#${cardId}</p>
            <div>
                <label for="sizes${cardId}">Size:</label>
                <select name="size"  id="sizes${cardId}">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </div>
            <div>
                <label for="colors${cardId}">Colour:</label>
                <select name="color" id="colors${cardId}">
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Green">Green</option>
                </select>
            </div>
        </div>
    `;
};

const createSelectSize = (cardId) => {
    return `
        <div>
            <div style="display: flex; gap: 70px; padding-left:25px">
                <p>Size</p>
                <p>Colour</p>
            </div> 
            ${cardId >= 1 ? size(1) : ''}
            ${cardId >= 2 ? size(2) : ''}
            ${cardId >= 3 ? size(3) : ''}
        </div>
    `;
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("sec");
    const totalElement = document.getElementById("totalp");

    let totalPrice = 0;
    let selectedCard = null;

    data.forEach(item => {
        const div = document.createElement("div");
        const att = document.createAttribute("data-id");
        att.value = `${item.id}`;
        div.setAttributeNode(att);
        div.className = "card";
        div.innerHTML = `
            <div class="item">
                <div class="input">
                    <input type="radio" name="product" id="product${item.id}" data-price="${item.price}" />
                    <label for="product${item.id}">
                        <h3 id="title">${item.title}</h3>   
                        <h4>${item.id === 1 ? "Standard Price" : ''}</h4> 
                    </label>
                    <p id="discount">${item.dis}</p>
                </div> 
                <div>
                    <p id="price">$${item.price.toFixed(2)} USD</p>
                    <p id="dsprice">$${24.00.toFixed(2)} USD</p>
                </div>
            </div> 
            <h4 class="${item.id === 2 ? 'card2Most' : ''}">${item.id === 2 ? "MOST POPULAR" : ''}</h4> 
        `;
        form.appendChild(div);

        const sizeColorContainer = document.createElement("div");
        sizeColorContainer.className = "sizecolor-container";
        sizeColorContainer.setAttribute("data-id", `${item.id}`);
        div.appendChild(sizeColorContainer);

        const radio = div.querySelector(`#product${item.id}`);
        radio.addEventListener("change", () => {
            if (radio.checked) {
                totalPrice = item.price;
                updateTotalPrice();
                selectSizeFunc(selectedCard.getAttribute("data-id"));
            }
        });

        div.addEventListener("click", (event) => {
            if (selectedCard && selectedCard !== div) {
                clearSizeColor(selectedCard);
                selectedCard.classList.remove("selected");
            }
            selectedCard = div;
            selectSizeFunc(selectedCard.getAttribute("data-id"), event);
            selectedCard.classList.add("selected");
            event.stopPropagation();
        });
    });

    function updateTotalPrice() {
        totalElement.textContent = `Total: $${totalPrice.toFixed(2)} USD`;
    }


    function selectSizeFunc(cardId, evt) {
        const container = document.querySelector(`.sizecolor-container[data-id="${cardId}"]`);
        if (container) {
            container.innerHTML = createSelectSize(cardId);
            const selectOptions = container.querySelectorAll('select');

            selectOptions.forEach(select => {
                select.addEventListener("change", (event) => {
                    event.preventDefault();
                    console.log(`Selected ${select.name}: ${select.value}`);
                });
                select.addEventListener("click", (event) => {
                    event.stopPropagation();
                });
            });
            
        }
    }

    function clearSizeColor(card) {
        const cardId = card.getAttribute("data-id");
        const sizeColorContainer = document.querySelector(`.sizecolor-container[data-id="${cardId}"]`);
        if (sizeColorContainer) {
            sizeColorContainer.innerHTML = '';
        }
    }
});
