import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Icon } from "react-native-elements";
import { Notification } from "../../api";
import { useAuth } from "../../hooks";
import { ListNotification } from "../../components/Notification";

const notification = new Notification();

export function NotificationsScreen(props) {
  const { navigation } = props;
  const [notifications, setNotifications] = useState(null);
  const [showNotificationRead, setShowNotificationRead] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { accessToken, auth } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          type="material-community"
          name={showNotificationRead ? "eye-off-outline" : "eye-outline"}
          size={24}
          onPress={() => setShowNotificationRead((prevState) => !prevState)}
          style={{ marginRight: 10 }}
        />
      ),
    });
  }, [showNotificationRead]);

  useEffect(() => {
    (async () => {
      try {
        const response = await notification.getByUser(
          accessToken,
          auth.user_id,
          showNotificationRead
        );
        setNotifications(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [showNotificationRead]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await notification.getByUser(
        accessToken,
        auth.user_id,
        showNotificationRead
      );
      setNotifications(response);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  const readNotification = (idNotification, setIsRead) => {
    Alert.alert("¿Marcar como leido?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Si, marcar",
        onPress: async () => {
          try {
            await notification.read(accessToken, idNotification);
            setIsRead(true);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  if (!notifications) return null;

  return (
    <ListNotification
      notifications={notifications}
      onRefresh={onRefresh}
      refreshing={refreshing}
      readNotification={readNotification}
    />
  );
}
