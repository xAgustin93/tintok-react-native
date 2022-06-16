import React, { useState, useEffect, useRef } from "react";
import { View, Dimensions, FlatList } from "react-native";
import { Text, Icon } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import { size } from "lodash";
import { Comment as CommentController } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { nFormatter } from "../../../../utils";
import { Header } from "./Header";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import { styled } from "./Comments.styles";

const { height } = Dimensions.get("screen");
const commentController = new CommentController();

export function Comments(props) {
  const { idUser, idVideo } = props;
  const styles = styled();
  const sheet = useRef();
  const { accessToken } = useAuth();
  const [comments, setComments] = useState(null);
  const [reloadComment, setReloadComment] = useState(true);

  const totalComments = size(comments);

  useEffect(() => {
    (async () => {
      try {
        const response = await commentController.getCommentsVideo(
          accessToken,
          idVideo
        );
        setComments(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reloadComment]);

  const openSheet = () => sheet.current.open();
  const closeSheet = () => sheet.current.close();
  const onReloadComments = () => setReloadComment((prevState) => !prevState);

  return (
    <>
      <View style={styles.content}>
        <Icon
          type="material-community"
          name="comment-processing"
          size={40}
          onPress={openSheet}
        />
        <Text>{nFormatter(totalComments)}</Text>
      </View>

      <RBSheet
        ref={sheet}
        height={height - 200}
        openDuration={200}
        keyboardAvoidingViewEnabled={false}
        customStyles={{
          container: styles.rbSheetContainer,
        }}
      >
        <Header onClose={closeSheet} commentCounter={totalComments} />

        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <Comment comment={item} onReloadComments={onReloadComments} />
          )}
          keyExtractor={(item) => item.id}
          style={styles.commentsList}
          ListEmptyComponent={
            <Text style={styles.noCommentText}>Se el primero en comentar</Text>
          }
        />

        <CommentForm
          idTargetUser={idUser}
          idVideo={idVideo}
          onReloadComments={onReloadComments}
        />
      </RBSheet>
    </>
  );
}
