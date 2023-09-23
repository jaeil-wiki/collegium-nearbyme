const userAccountId = props.accountId || context.accountId;
console.log(userAccountId);
const p = Social.getr(`${userAccountId}/profile`);

const userName = p?.name;
const userImage = p?.image;
const imageUrl = image.ipfs_cid
  ? `https://ipfs.near.social/ipfs/${image?.ipfs_cid}`
  : "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const Theme = styled.div`
  ${
  fetch(
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  ).body
}
`;

const Banner = () => (
  <div className="navbar bg-body-tertiary border rounded px-3 mb-3 justify-content-center">
    <a className="navbar-brand" href="#">
      <h2>nearbyme.social</h2>
    </a>
  </div>
);

const ProfileCard = ({ name, accountId, imageUrl }) => (
  <a
    href={`https://near.social/mob.near/widget/ProfilePage?accountId=${accountId}`}
    style={{ textDecoration: "none" }}
  >
    <div className="navbar bg-body-tertiary border rounded px-3 mb-3">
      <div className="row">
        <div className="col-3 mt-4">
          <img
            className="profileImage"
            src={imageUrl}
            style={{ height: "40px" }}
          />
        </div>
        <div className="col-9 pt-3">
          <h4>{name}</h4>
          <p>@{accountId.slice(0, 14)}...</p>
        </div>
      </div>
    </div>
  </a>
);

const BesideUsers = () => {
  const [users, setUsers] = useState([]);
  setInterval(() => {
    console.log("refresh");
    setUsers(fetch("https://asdf.jaeil.wiki/room/1").body);
  }, 3000);

  console.log(users);
  return (
    <div className="row">
      {users.map((accountId) => {
        const p = Social.getr(`${accountId}/profile`);
        const name = p?.name;
        const image = p?.image;
        const imageUrl = image.ipfs_cid
          ? `https://ipfs.near.social/ipfs/${image?.ipfs_cid}`
          : "https://thewiki.io/static/media/sasha_anon.6ba19561.png";
        return (
          <div className="col-6">
            <ProfileCard
              name={name}
              accountId={accountId}
              imageUrl={imageUrl}
            />
          </div>
        );
      })}
    </div>
  );
};

const Attendies = () => {
  const users = fetch("https://asdf.jaeil.wiki/room/1").body;
  return (
    <div className="row">
      {users.map((accountId) => {
        const p = Social.getr(`${accountId}/profile`);
        const name = p?.name;
        return (
          <div className="col-4">
            <div className="navbar bg-body-tertiary border rounded px-3 mb-3 justify-content-center">
              <div className="text-truncate">{name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const BeaconSimulator = () => {
  return (
    <div
      className="mb-3 px-1 border"
      style={{ borderBottom: "solid 1px gray" }}
    >
      <div className="row">
        <div className="fs-3">Beacon Simulator</div>
      </div>
      <div className="row">
        {["Lobby", "Cafeteria", "ConfRoom1", "ConfRoom2"].map(
          (location, idx) => (
            <div className="col-3 mb-2">
              <div className="btn btn-primary w-100">{location}</div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

return (
  <Theme>
    <div className="container-fluid mt-3 pb-3">
      <BeaconSimulator />
      <Banner />
      <ProfileCard
        name={userName}
        accountId={userAccountId}
        imageUrl={imageUrl}
      />
      <p className="fs-3">Builders nearby me</p>
      <BesideUsers />
      <p className="fs-3">Collegium Contest Attendies</p>
      <Attendies />
    </div>
  </Theme>
);
