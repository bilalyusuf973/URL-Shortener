import { useState, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

function UrlShortner() {

  const [value, setValue] = useState("");
  const [result, updateResult] = useState("");
  const [copied, setCopied] = useState(false);

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  const handleShorten = () => {
    const axios = require("axios");

    const encodedParams = new URLSearchParams();
    encodedParams.append("url", value);

    const options = {
      method: "POST",
      url: "https://url-shortener-service.p.rapidapi.com/shorten",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "b35f0dd809mshc2b823a05bbd521p13135bjsn1b30afe49d79",
        "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
      },
      data: encodedParams,
    };

    axios
      .request(options)
      .then(function (response) {
        updateResult(response.data.result_url);
      })
      .catch(function (error) {});
  };

  useEffect(() => {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 250);
  
      return () => clearTimeout(timer);
    }, [copied]);


  const handleReOnChange = (e) => {
      updateResult(e.target.value);
  };

  return (
    <>
      <div className="form-check form-switch my-3 mx-3">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Switch to TextUtilities
        </label>
      </div>
      <div className="UrlArea">
        <h1 className="mainHeading">
          URL <span>Shortner</span>
        </h1>
        <br />
        <div className="urlinput">
          <input
            type="text"
            placeholder="Enter URL"
            value={value}
            onChange={handleOnChange}
          />
          <button onClick={handleShorten}>Shorten</button>
        </div>
        {result && (
        <div className="result">
          <textarea
            id="textarea"
            placeholder="Result"
            rows={1}
            value={result}
            onChange={handleReOnChange}
          ></textarea>
          <CopyToClipboard text={result} onCopy={() => setCopied(true)}>
            <button className={copied ? "copied" : ""}>
              Copy to Clipboard
            </button>
          </CopyToClipboard>
        </div>
      )}
      </div>
    </>
  );
}

export default UrlShortner;
