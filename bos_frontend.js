// mocks & constants
const apiHost = 'https://collegium.runafter.build';
const deployerAccountId = '58423e7fe4bbc6956ea637d23cbeedee8ec23873fcd93bafb69086af625563e9';
const places = ["Lobby", "Cafeteria", "ConfRoom1", "ConfRoom2"];
// Props
const userAccountId = props.accountId || context.accountId;
// States
State.init({
  place: props.place || 0,
  users: [],
  attendees: [],
});
// methods
const getProfile = (accountId) => {
  const p = Social.getr(`${accountId}/profile`);
  const name = p?.name;
  const image = p?.image;
  const imageUrl =
    image && image.ipfs_cid
      ? `https://ipfs.near.social/ipfs/${image?.ipfs_cid}`
      : "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

  return {
    name,
    imageUrl,
  };
};

// Sub Components
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
  return (
    <div className="row">
      {!state.users ||
        (state.users.filter((accountId) => accountId !== userAccountId)
          .length === 0 && (
          <div class="fs-5 my-5 w-100 text-center" style={{ color: "gray" }}>
            {" "}
            There is no users in place{" "}
          </div>
        ))}
      {state.users &&
        state.users
          .filter((accountId) => accountId !== userAccountId)
          .map((accountId) => {
            const { name, imageUrl } = getProfile(accountId);
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

const Attendees = () => {
  return (
    <div className="row">
      {state.attendees &&
        state.attendees.map((accountId) => {
          const { name } = getProfile(accountId);
          return (
            <div className="col-4">
              <a
                href={`https://near.social/mob.near/widget/ProfilePage?accountId=${accountId}`}
              >
                <div className="navbar bg-body-tertiary border rounded px-3 mb-3 justify-content-center">
                  <div className="text-truncate">{name}</div>
                </div>
              </a>
            </div>
          );
        })}
    </div>
  );
};

const beaconAdvertise = () => {
  asyncFetch(`${apiHost}/room/${state.place}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      accountId: userAccountId,
    }),
  });
};

const BeaconSimulator = () => {
  return (
    <div
      className="mb-3 px-1 border"
      style={{ borderBottom: "solid 1px gray" }}
    >
      <div className="row">
        <div className="fs-3">Beacon Simulator</div>
        <div className="fs-5">You are in: {places[state.place]}</div>
      </div>
      <div className="row">
        {places &&
          places.map((location, idx) => (
            <div key={idx} className="col-3 mb-2">
              <a
                href={`https://near.social/${deployerAccountId}/widget/NearbyMe?place=${idx}`}
              >
                <div className="btn btn-primary w-100">{location}</div>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

const { name, imageUrl } = getProfile(userAccountId);
const fetchScanned = async () => {
  asyncFetch(`${apiHost}/room/${state.place}`, {
    cache: "no-store",
  }).then((res) => {
    State.update({ users: res.body });
  });
};

const fetchAttendees = async () => {
  asyncFetch(`${apiHost}/room`, {
    cache: "no-store",
  }).then((res) => {
    State.update({ attendees: res.body });
  });
};
useEffect(() => {
  fetchScanned();
  fetchAttendees();
  setInterval(() => {
    fetchScanned();
    beaconAdvertise();
  }, 3000);
}, []);

return (
  <Theme>
    <div className="container-fluid mt-3 pb-3">
      <BeaconSimulator />
      <Banner />
      <ProfileCard name={name} accountId={userAccountId} imageUrl={imageUrl} />
      <p className="fs-3">Builders nearby me</p>
      <BesideUsers />
      <p className="fs-3">Collegium Contest Attendees</p>
      <Attendees />
    </div>
  </Theme>
);
