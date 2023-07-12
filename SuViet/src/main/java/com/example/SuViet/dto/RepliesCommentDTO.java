package com.example.SuViet.dto;

import com.example.SuViet.model.RepliesComment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@NoArgsConstructor
public class RepliesCommentDTO {
    private int replyID;
    private String commentText;
    private String createdDate;
    private boolean enabled;
    private UserDTO user;
    private int userID;
    private int articleID;
    private int commentID;

    public static RepliesCommentDTO convertToDTO(RepliesComment repliesComment) {
        RepliesCommentDTO dto = new RepliesCommentDTO();
        dto.setReplyID(repliesComment.getReplyID());
        dto.setCommentText(repliesComment.getCommentText());
        // dto.setCreatedDate(repliesComment.getCreatedDate());
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        dto.setCreatedDate(repliesComment.getCreatedDate().format(dateFormatter));
        dto.setEnabled(repliesComment.isEnabled());
        dto.setUser(UserDTO.convertToDTO(repliesComment.getUser()));
        dto.setCommentID(repliesComment.getComment().getCommentID());

        return dto;
    }

    public RepliesComment convertToEntity() {
        RepliesComment repliesComment = new RepliesComment();
        repliesComment.setReplyID(this.replyID);
        repliesComment.setCommentText(this.commentText);
        // repliesComment.setCreatedDate(this.createdDate);
		try {
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDateTime formattedDate = LocalDateTime.parse(this.createdDate, dateFormatter);
            repliesComment.setCreatedDate(formattedDate);

        } catch (Exception e) {
            e.printStackTrace();
        }
        repliesComment.setEnabled(this.enabled);
        repliesComment.setUser(this.user.convertToEntity());
      
        return repliesComment;
    }
}
