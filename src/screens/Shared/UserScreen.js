import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Tab, TabView } from "react-native-elements";
import { User } from "../../api";
import { useAuth } from "../../hooks";
import { Account } from "../../components/Account";

const userController = new User();

export function UserScreen(props) {
  const {
    route: { params },
    navigation,
  } = props;
  const [user, setUser] = useState(null);
  const [tabActive, setTabActive] = useState(0);
  const { accessToken } = useAuth();
  const idUser = params.idUser;

  useEffect(() => {
    (async () => {
      try {
        const response = await userController.getUser(accessToken, idUser);
        navigation.setOptions({ title: response.first_name });
        setUser(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [idUser]);

  if (!user) return null;

  return (
    <ScrollView>
      <Account.Header avatar={user.avatar} username={user.username} />
      <Account.Follows idUser={user.id} />
      <Account.Social idUser={user.id} instagram={user.instagram} />
      <Account.Info description={user.description} website={user.website} />

      <Tab
        value={tabActive}
        onChange={(e) => setTabActive(e)}
        indicatorStyle={{ backgroundColor: "#fff" }}
      >
        <Tab.Item
          containerStyle={{ backgroundColor: "transparent" }}
          icon={{ type: "material-community", name: "grid" }}
        />
        <Tab.Item
          containerStyle={{ backgroundColor: "transparent" }}
          icon={{ type: "material-community", name: "heart" }}
        />
      </Tab>
      <TabView value={tabActive} onChange={setTabActive} animationType="timing">
        <TabView.Item>
          <Account.Videos idUser={user.id} />
        </TabView.Item>
        <TabView.Item>
          <Account.VideosFavorites idUser={user.id} />
        </TabView.Item>
      </TabView>
    </ScrollView>
  );
}
