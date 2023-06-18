import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/customHooks";

const ProfileView = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const { getUserById, userLogged } = useAuth();

  const uid = userLogged?.uid;

  useEffect(() => {
    setLoading(true);
    getUserById(uid).then((res) => {
      console.log(res.data());
      const result = {
        id: res.id,
        data: res.data(),
      };
      setUser(result);
    });
    setTimeout(() => setLoading(false), 2500);
  }, [getUserById, uid]);

  console.log(user);

  return (
    <div style={{ marginTop: "250px" }}>
      {user.id}
    </div>
  );
};

export default ProfileView;
