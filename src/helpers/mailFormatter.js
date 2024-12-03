export const mailFormatter = (userNames, email, message) => {
  return `<body style="margin: 0; padding: 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="900px" style="padding: 0 40px 0 40px; background-color:#f1f2f3;">
              <tr>
                <td align="center" style="background-color:#0074D9; margin: 0 50px 0 50px;">
                  <a>
                    <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 32px; line-height: 40px;">Reformation voice website<p>
                  </a>
                </td>
              </tr>
              <tr>
                <td align = "center" style="padding: 0 50px 0 50px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#ffffff; padding: 0 0 0 20px;">
                    <tr>
                      <td align="left" style="font-family: Arial, sans-serif; font-size: 24px; color: #050505;">
                        <p>Name: ${userNames}</p>
                        <p>Email: ${email}</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                        <p>${message}</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 30px 30px 30px 30px;">
                        &copy; Reformation voice, ${new Date().getFullYear()}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </body>`;
};

export const replyTemplate = (content = {}, lang) => {
  const topicLink = `${process.env.APP_LINK}/${lang}/topics/${content.slug}`;
  return `
  <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Comment reply</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
          color: #333;
        }
        .comments-section {
          max-width: 600px;
          margin: 20px auto;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h2 {
          font-size: 24px;
          margin-bottom: 20px;
          text-align: center;
          color: #555;
        }
        .comment,
        .reply {
          margin-bottom: 15px;
        }
        .comment {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          background: #fdfdfd;
        }
        .comment-body {
          margin-bottom: 10px;
        }
        .comment-author {
          font-weight: bold;
          color: #007bff;
        }
        .comment-text {
          margin: 5px 0 5px;
        }
        .reply {
          margin-left: 20px;
          padding-left: 15px;
          border-left: 3px solid #007bff;
          background: #f8f9fa;
          border-radius: 5px;
        }
        .reply-body {
          padding: 10px 0;
        }
        .reply-author {
          font-weight: bold;
          color: #28a745;
        }
        .reply-text {
          margin: 5px 0 5px;
        }
      </style>
    </head>

    <body style="margin: 0; padding: 0">
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="900px"
        style="padding: 0 40px 0 40px; background-color: #f1f2f3"
      >
        <tr>
          <td
            align="center"
            style="background-color: #0074d9; margin: 0 50px 0 50px"
          >
            <a>
              <p
                style="
                  color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 32px;
                  line-height: 40px;
                "
              >
                ${content.appName}
              </p>
              <p></p>
            </a>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 0 50px 0 50px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="background-color: #ffffff; padding: 0 0 0 20px"
            >
              <tr>
                <td
                  align="left"
                  style="
                    color: #153643;
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 20px;
                  "
                >
                  <div class="comments-section">
                    <h2>
                      ${content.header}
                    </h2>
                    <div class="comment">
                      <div class="comment-body">
                        <p class="comment-author">${content.commentor}</p>
                        <p class="comment-text">
                          ${content.commentBody}
                        </p>
                      </div>
                      <div class="reply">
                        <div class="reply-body">
                          <p class="reply-author">${content.rrv}</p>
                          <p class="reply-text">
                            ${content.commentReply}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p class="comment-text">
                      ${content.action}: <a href="${topicLink}">
                      ${content.title}</a>.
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 30px 30px 30px 30px">
                  &copy; Reformation voice, ${new Date().getFullYear()}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
