import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Chat");
  }
  async getMessages(username, chatname) {
    console.log(username, chatname);
    return {};
  }
  async getHTML() {
    const mesages = this.getMessages(
      this.params.username,
      this.params.chatname
    );
    return `<div id="chat-container">
      <div id="search-container">
            <img src="./static/Images/user.png" alt="profile picture" class="profile-picture">
            <input type="text" placeholder="Search"/>
      </div>
      <div id="conversation-list">
        <div class="conversation">
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxANChAIEAgJCAgNEAoNCAkJBxsICQgKIB0iIiAdHx8kKDQsJCYxJx8fLTItMTU1MDAwIys/TT82PzQ5MDUBCgoKDQ0OFQ8PFSslFiUrKzcvNzc3Ny43Ny0zNys3KysrNzgrKystLS0rKysrKysrKysrKystKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQIFAwYHBAj/xAA7EAABAwIDBQUHAgYBBQAAAAABAAIDBBEFEiEGEzFBUQciYXGBFCMykaGx0ULhM1JicsHwYxUWJDRD/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAEDAgQFBv/EACIRAQACAgICAgMBAAAAAAAAAAABAgMRITEEEhNRM0FxMv/aAAwDAQACEQMRAD8A6gkpJLN0VkipJFURSUkkESkpFJBEoTQiIoKaSKSSkkgSVlKySBJEKSSIikpJIEUrKSSBJKSSKihNCgskk0KhFIppIIoTSQJJMpIEokgc7eq8uLV7aWmkq3kBsbXOAJy53cguIY7ttV1DzJvnU8ZIAjiOUAaoOs4rtlRUsm5kqSZQRmZHHnLdVWYr2h0sEwhaHVTSGudLGe40FcSqagyOMhkLib3c43LlgdPp8WY9VdD6Bm23oW2tWNeXBpGUFwA8V6qXaamk137Q02s4OztC+cW1bup0Vxge0UlNIHg52frjfq1zVNScPo6N4c3OHBzTwINwVNc22Y29gztjkLqcOAbIT34w7qujRyB7RI1wexwDmuabhzVA0kyhVCSTSQJCZSQJCEIEhCaKsEJ2SQIpFMpFQJJNIqhFIoKRKDmvazXkmKhD7M/iPaDa7uS5YYjJIYww5idQBcLdu0uRz8ZNOG5g1sTWjnc6q52f2ajgAkf72osMziO60+Cztf1a0p7OeR7LzvGYROa08M2i91JsQ8m73ac/FdRfTAcPRREQWM5rt4xUhzj/ALMHNxHgBqVhk2N5tkt5jiulGEcbLBPECOFlz8t/tfjp9OVVmATwjM33gbfRp1K6B2Q7RySB+DykuEbc9MXfFG3m1KojF/utNxGd9BiQrIHmB5s67TYE8/RbY8k24ljlxRWNw+gUlVbMYsK7D4a+wa57bStHBso0P1VqtnnCRQhAkJpIBJNCBITQgsUk0kUlEqRUSgRUSpFRKCJUSUyokoOU7XU4O1DehFM5wtpey2qIqk2oiJ2ni04wxvH9veC9OJY7BRW3jnPldqyGMZ5CF5sm5tqHqxcV2t3MNrrFlsVqb9vC92RmGzDoXm2iv8PxHexh5blPMdFx6a7aRO+nuMei8dQzROrrw2MkfEAbeJWlVu0FdvCyOCN7f05o7myeu+iZ0vanS/r6LStrWHMx1uTuS97ceqmG9TQlsN+9JE3VoUsZY2oozOwh4aC9jgOI5rqkTW0S5vMWrMNv7G5i7DZos1wyfui/AFoW/rmfYtId3WRfpDqZw63Id+F0xep4ghCSBoQgoBJMoRSQhNBY2SUlFQIqJUiolURKgVMqJQQKgSplY3INO2iYP+vU77amlqG8ONnfuVQmkihkfVTOD53uc50smpDeg6ALYMdu/FqaTu5IXVEThazhmZcemidbhrJNTGHjoRmF15ck7l68ddRy0iuxaF03s7Gye0XFhui0nS6tMAmdI4Xad3exNrWKz1OBNM2+EfvDYB51cArOgoN1Yk68Tre5XM61w1jf7VmPNc1+6ZzBPHitbNeYGundC+RrCA8tF7FbVjIvLY8OS8RwsO71s4PEEXulZ+1npTQYyycBphfHnByhw0LV6PZgyllaAGsLZHAWsBoriPCG8cjW26NWOvh906MAfC4DpwTfLiY4T7GYCIKqfk58LB5gE/5XSFyjZcyU7KaCNzgXyxOm17ocbXXV16q29nkyY5rrf7CEJrpmEBCEUIQhECEFCKsklKyVlBFRKmVEqiBUCplRIUGMrGVkcoFBSYtCBO2UAAuy5zbU2B/Kiw6eHPRe3E47tD+Tb38FXMOl/wDSvNeNWevHO4hCXQ3/ANCxGRo1c4DjlF9S5ePGsUjpI99I7U/AwfE5aBjG0onlztpybFu5JJzBykRvprMxDb8Vkjc6wkGblrzUqCbuAdND5rnWLV7zKHmB+jQe8wgsPgrLB9pgzLG9hazQF172Vmk62nyRvTf5H937qrqXDXVZRVB8YeCCCAWkHQhYYqd8z92xoe4DMQTluFnHM6W2oevZqgDqphHwtcZXa34LfVR7PUJizSuGWRwaA29wxqvF6sddQ8ea/tbgBNIJhaMghNJAITQgSE0kFoUipJFRUSolSKiVRAqBWQqDkGMhQcshUCiMMg06qoq+68jrYhXLxoqjEiPiHLR3ksskbq0x21Zpm12CGskieJsgYHDd20LlgpcDMEYbeJj28SILgnzWxVAuQemo1Wt7W4u6Kns2X3hOga7XKvPSZnh7a29Z2hV0r7a1LHX4Ax3sFTz4IZnd5zWR8S5seVxVLhmLTOnAdO4Nc4Zi43DQtvdLmsM4I8+IXd91dTlreOmWkjbDE2naS5rQACTckK92aZeV8nQNbdUDHftqttwCDd0wf+qTvHwbyUxRu22GadV0vIOK9a8VMdV7QvW8ZhCAmiBCEIoQhCASTQgtSokKSSiolRKmVEoMZUSplQKogVAqZUSiMbgqjEWcR1Vw5V2JRktLwNALu8Aub9S6r3Dn+2FdJBT924u4BzuYC53XVpde7i53Mk3uV2HF6FlRC6J7bscCHdbLSq3YqMjuyyNPQm4K82O1Y7eu9ZnporZba816afEJA8d9xAtYX0srap2WLHWzv8NLrLR4IyN2YgvcOBdqAVvN6TDOuO8LiklJYCfis2/W66Hhf/qxf2MWiwQWbfl91veEC9LEf6W8Fnh7kz9QsYjZe1puLrxRjVe1o0svQ8qQQhMIBCEIoSTQgRQhCC2KVlJIqKgVErIVAoIFYyshWNyqIFQKk4rBPM1jTI57Y42glz3uyNaEEyVnp6YSRPY4d14ynWxAWo022MFTicWD05E7pHO3tSe7CxoBJt1Oi3yJoaAzkOHipZYaXiNG+F5jcO6b7t9u7I1VM0B6LpFTTNlYY3ND2HiCOBWpYvhTqcmQAy03W13Rea8lseunrpkieJanWU5t8AP3Vb7Ib8P2Wxzlp6fPiigwqSocQ1uSMHvyuHdH5XGp6azMR2qKWifK8U7Bdx4n9LR1K3KngEUbYAbhjQ2/UrNTULKdm7Y3XTPIdXPKi5p4gX42F7XXpx09Xky39uIZqdut17AqXC9oKWeR1M2oZHWMc6OWlmO6qGSDiLc/RXIWzBIJqKaKaEIQCEIQCSaSC4SUklFRKg5TKg5BjcvHW1ccEZmkmjgib8UkkmRoVi2AnjoPquP9trSzEKdud27MBszNdodmNz9la8zpJWWOdpsEZMdNA6seLgTSHdQ38OZ+i51j20tVXuvNUHdA9ynj93C30/KqXKBWsRpyttlqw0+KU9QHZSJWNJvazTofuvpihfvIGSfqIF+t18pxkhweNCCCDfUFfTmyFd7Rh8NRmvvI43+Rtqs7uqrYAql2qx2DD6bfynPI64gp2n3k7vx4q2r6xsERldqeDI26ukd0C5Dt5hM9S52Mulc+VgsaYaxw03QeXFZtsNYteIt0rqzbgavGE07JCS4l0xLAfIWW6bG7aQYjH7LumUdexutO02jkb1b+FxivNm36rbtg9kXvYMXfJJTyAg0WQ5HA/wAyREPZ5WOleIdVfq6/zSeyzC75LHRTFwyPAbO34wBZsniF6Jz3LdSj5zgG3JtjlSQbHOxwLTYh2UKw2f7QaykLY3ye30osDHUG8jW+DuP3VXtq/PjNU4cpS35AD/CpQPBbR05d6wPbmhrAB7SKOc2vDVHdG/geBWytcCLggg8CDcEL5hC6n2P4u94nw18jpGMDJadrnZjG3gQPopMDpoTUQVJcqEISQMpJpIq6KRTSKgiVmZEGjMTry8FBo5rI03BHMKDHLLpppyHUrjnbcP8Ay6U8fdzA+dwuuzus0HxXJO2z+NR9ctVf5tXVOyenMXKNlkIUSt3CIXZ+x3GC6hNCXZpIHuyNvrujqPrdcYW29mmLeyYvGCbQz3hkudA48Pr91xaNwsS7hPGXvzPdnf4fCwdAqHa+oZS4fJIWB73gxxtJ0LjotkYOfG65/wBqcx3cUd+6ZHHwNh+6werx6+2SsS5fUNYHxuc0mIPj3gvq5l9V3qka32dm7y7khhiyjulltFwStbdpXUOy/GDUYaaJ5vNSua1tzcmA8PlqPkq9fn0522/IDy1HAjRwKhUkhpcTo0a8l6WM5qn2vrRBhNRUXsRHIGf3HQfUo+a4Dik+9q5qjjvJZnj1JK8wTKFs4FvBbf2XS5cYDAbbyKZvHjz/AMLUQFsfZ/LkxunN+Jkbx5lpCT0O5B5Bsdbc+aztdcfZYZfi8w2ykRlaD04+Sxh1LKhIFNdIEkIQXZSTKBxUU/BEZ96Byc13zCRS/U1/8pN/IrlXnrdLD+r6LkvbT/HpLnXJUkeAu1dfqmXcOguT0C4z2zVWfEIIgLNZC4t6kFx/C7p2lunPeSiVJIr0OEFkjcWuDwcrmkFpvYhyiUlB9EbI4sK3D4qq4zloEwv8Mo0P1WndqknvKePl79x89FUdk2O7mqfhjn2imBfBc6CYDUeo+y9nadLerhbxtG8+HH9l57RqXu8HnLDR5xcLZOyyoMeJvgv3ZYnaci4EH8rXHc/RW2wz8mMwH+YytPq0rl9Py67pLt3Jc47XsS3dHFhwPfmfnkF//k39yPkuig90HwXBe0DFfbMWleHZoYvcwa3BaOJ+d11WNy+DLWrITRZbODsrDZ+bdYjTzXtlmhJ8rqvU2OyvDhxBaRrwKSPpBney+QWWU6OHQELFh7g5jZORa0j1Smdo7xsPVYS7Spn3bbmPssy8VO6z7ddF7VYAhK6aouykEIXIRKL6EdeCSFFYqmQuaGDQu0cegXD+1qUOxwxjhFDTx+R1P+UIWmPtLNLckEIWzMEKKEIrJSVDoZmVDHZJY3NfG7mHBbftRiza009Uw8YG52XuY33NwhCzyQ9vgfmhQu4Fe3Zl+XFKZ/8AzRj56JoWL7Of/E/x1LbbGvYcJfKHAVEgMVNrrvTz9Bc+i4GTqmhbUjh+bnsBBKELpyRSufwhCD6G2amvh9PITe8FO7zJaF6ZeIbzN3P8ChCwl3DGDZwPiLKwTQrBJIQhEf/Z" alt="Emilian Diac">
            <div class="client-name">
                Emilian Diac
            </div>
        </div>
      </div>
      <div id="chat-title">
        <span>Emilian Diac</span>
    </div>
    <div id="chat-message-list">
        <div class="your-messages-row">
            <div class="message-text">Salut! Bine. Tu ce faci?</div>
        </div>
        <div class="other-messages-row">
            <div class="message-text">Salut! Ce faci?</div>
        </div>
    </div>
    <div id="chat-form">
        <input type="text" placeholder="Type here!">
    </div>
  </div>
                `;
  }
}
