const input = document.querySelector("#input");
const button = document.querySelector("#button");
const dataContent = document.querySelector(".data-content");
const spanError = document.querySelector(".waring_btn");

// Functain wen we start
const handleStart = () => {
  const inputValue = input.value;
  if (inputValue) {
    dataContent.innerHTML = "";
    GetInfo(inputValue);
    input.value = "";
  } else {
    addTexToErorButton("لم تكتب شيء");
    addAndRemoveClassShowTheMassage();
  }
};

// Remove page refresh and run function (handleStart())
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleStart();
  }
});

// Get value of input when click on button
button.addEventListener("click", (e) => {
  e.preventDefault()
  handleStart()
});

// Add text Depending on the error condition
const addTexToErorButton = (text) => {
  spanError.textContent = text;
};

// This Function Add The Class Custom To Add Class (showTheMassage) Error And After 1500 A Minute And A Half Delete
const addAndRemoveClassShowTheMassage = (autoHide = true) => {
  spanError.classList.add("showTheMassage");

  if (autoHide) {
    setTimeout(() => {
      spanError.classList.remove("showTheMassage");
    }, 1500);
  }
};

// Get info from API
async function GetInfo(userName, theLinkNotBroken = true) {
  try {
    const response = await fetch(`https://api.github.com/users/${userName}`);

    if (theLinkNotBroken) {
      if (!response.ok) {
        addTexToErorButton("لا يوجد هاكذا مستخدم");
        addAndRemoveClassShowTheMassage();
        return;
      }

      const data = await response.json();

      const extractData = {
        // avatar_url: data.avatar_url,
        bio: data.bio,
        name: data.name,
        twitter_username: data.twitter_username,
        followers: data.followers,
      };

      const allNullOrZero = Object.values(extractData).every(
        (v) => v === null || v === 0
      );

      const content = `
      <div class="card">
        <div class="container-img-pio">
          <img
            id="avatar_url"
            src="${data.avatar_url}"
            width="200"
            alt="personal pic"
          />
          ${
            allNullOrZero
              ? `<p>لا تتوفر معلومات</p>`
              : `${extractData.bio ? `<p>${extractData.bio}</p>` : ""}`
          }
          
        </div>
        
        <div class="container-of-info">
          ${
            extractData.name
              ? `
              <div class="info">
                <div class="slider">
                  <p>Name</p>
                  <span id="name">${extractData.name}</span>
                </div>
              </div>
            `
              : ""
          }

          ${
            extractData.twitter_username
              ? `
            
            <div class="info">
              <div class="slider">
                <p>Twitter Username</p>
                <span id="twitter_username">${extractData.twitter_username}</span>
              </div>
            </div>
            
            `
              : ""
          }

          ${
            extractData.followers && extractData.followers !== 0
              ? `
                <div class="info">
                  <div class="slider">
                    <p>Followers</p>
                    <span id="followers">${extractData.followers}</span>
                  </div>
                </div>
                `
              : ""
          }

        </div>
      </div>
    `;

      const contentDOM = document
        .createRange()
        .createContextualFragment(content);
      dataContent.appendChild(contentDOM);
    }
  } catch (error) {
    addTexToErorButton("الخدمة متوقفة مؤقتًا (Error 404)");
    addAndRemoveClassShowTheMassage(false);
    button.disabled = true;
    input.disabled = true;
  }
}

GetInfo("mohamedabusrea", false);
