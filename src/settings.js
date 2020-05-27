const renderSettingsTab = () => {

  document.getElementById('settings-container').innerHTML = `
    <p>Settings <i class="fas fa-caret-down"></i></p>
      <div class="settings-dropdown">
        <label for="fonts">Choose a font:</label>
        <select name="fonts" id="font-select">
          <option value="">Select a font</option>
          <option value="caveat">Caveat</option>
          <option value="garamond">EB Garamond</option>
          <option value="inconsolata">Inconsolata</option>
          <option value="montserrat">Montserrat</option>
          <option value="yellowtail" id='yellowtail'>Yellowtail</option>
        </select>
      </div>
  `;

  const fontSelect = document.querySelector("#font-select");
  const body = document.querySelector('body');

  //Set settings dropdown to their respective font style. There is no way to style these in Chrome/Safari: https://css-tricks.com/dropdown-default-styling/
  const caveatOption = fontSelect.querySelector('option:nth-child(2)');
  caveatOption.style.fontFamily = "Caveat,cursive";

  const garamondOption = fontSelect.querySelector('option:nth-child(3)');
  garamondOption.style.fontFamily = "EB Garamond,serif";

  const inconsolataOption = fontSelect.querySelector('option:nth-child(4)');
  inconsolataOption.style.fontFamily = "'Inconsolata', monospace";

  const montserratOption = fontSelect.querySelector('option:nth-child(5)');
  montserratOption.style.fontFamily = "'Montserrat', sans-serif";

  const yellowtailOption = fontSelect.querySelector('option:nth-child(6)');
  yellowtailOption.style.fontFamily = "'Yellowtail', cursive";


  fontSelect.addEventListener('change', (e) => {
    const inputs = document.querySelectorAll('input');
    const inputArr = Array.from(inputs);

    if (e.target.value === "caveat") {
      body.style.fontFamily = "Caveat,cursive";
      for (let i = 0; i < inputArr.length; i++) {
        inputArr[i].style.fontFamily = "Caveat,cursive";
      }
    }	else if (e.target.value === "garamond") {
      body.style.fontFamily = "EB Garamond,serif";
      for (let i = 0; i < inputArr.length; i++) {
        inputArr[i].style.fontFamily = "EB Garamond,serif";
      }
    } else if (e.target.value === "inconsolata") {
      body.style.fontFamily = "'Inconsolata', monospace";
      for (let i = 0; i < inputArr.length; i++) {
        inputArr[i].style.fontFamily = "Inconsolata', monospace";
      }
    } else if (e.target.value === "montserrat") {
      body.style.fontFamily = "'Montserrat', sans-serif";
      for (let i = 0; i < inputArr.length; i++) {
        inputArr[i].style.fontFamily = "'Montserrat', sans-serif";
      }
    } else if (e.target.value === "yellowtail") {
      body.style.fontFamily = "'Yellowtail', cursive";
      for (let i = 0; i < inputArr.length; i++) {
        inputArr[i].style.fontFamily = "'Yellowtail', cursive";
      }
    }
  });
}
