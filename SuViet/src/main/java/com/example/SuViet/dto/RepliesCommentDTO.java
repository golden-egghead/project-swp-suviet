package com.example.SuViet.dto;

import com.example.SuViet.model.RepliesComment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class RepliesCommentDTO {
    private int replyID;
    private String commentText;
    private Date createdDate;
    private boolean enabled;
    private UserDTO user;

    public static RepliesCommentDTO convertToDTO(RepliesComment repliesComment) {
        RepliesCommentDTO dto = new RepliesCommentDTO();
        dto.setReplyID(repliesComment.getReplyID());
        dto.setCommentText(repliesComment.getCommentText());
        dto.setCreatedDate(repliesComment.getCreatedDate());
        dto.setEnabled(repliesComment.isEnabled());
        dto.setUser(UserDTO.convertToDTO(repliesComment.getUser()));

        return dto;
    }

    public RepliesComment convertToEntity() {
        RepliesComment repliesComment = new RepliesComment();
        repliesComment.setReplyID(this.replyID);
        repliesComment.setCommentText(this.commentText);
        repliesComment.setCreatedDate(this.createdDate);
        repliesComment.setEnabled(this.enabled);
        repliesComment.setUser(this.user.convertToEntity());
      
        return repliesComment;
    }
}
