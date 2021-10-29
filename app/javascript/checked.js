function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();

      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false ){
          post.removeAttribute("data-check");
        }
      }
    })
  })
}
setInterval(check, 1000);

// const postsの中身には投稿されたメモが全て入っている。
// つまりこの中身は複数系なので一つずつに処理をしたい場合はformEachを用いて行う。

// ・XMLHttpRequest
// Ajax(非同期通信)を可能にするための「オブジェクト」で、サーバーに対してのHTTPリクエストを非同期で行うことができる。

// だが今のままだと、クリックしたメモがどのメモなのかを判別ができないため、リクエストの中に、どのメモをクリックしたのかの情報として、
// メモのidをビューファイルに埋め込んで、javaScriptで取得できるようにする。ビューファイルにidを埋め込む方法として、カスタムデータ属性を使う。

// ・カスタムデータ
// HTMLに対して任意の造成を持たせられる機能のことで、
// 下記のようにdata-<情報>として、属性値には文字列で情報を与えることができる。
// <div class="sample" data-id= "1">
// </div>
// HTMLの属性を使うときは、スタイルなのブラウザ上の見た目を変えたりすつ時に使うことがほとんどだが、javaScriptを合わせて使う時には
// 表示されているデータのidなどの情報を持たせたい場合がある。
// その時にカスタムデータで任意の情報を付与すると便利。
