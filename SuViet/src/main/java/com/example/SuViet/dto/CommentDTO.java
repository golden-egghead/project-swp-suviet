package com.example.SuViet.dto;

import com.example.SuViet.model.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class CommentDTO {
    private int commentID;
    private String commentText;
    private Date createdDate;
    private boolean enabled;
    private UserDTO user;

    public static CommentDTO convertToDTO(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setCommentID(comment.getCommentID());
        dto.setCommentText(comment.getCommentText());
        dto.setCreatedDate(comment.getCreatedDate());
        dto.setEnabled(comment.isEnabled());
        dto.setUser(UserDTO.convertToDTO(comment.getUser()));
        // Set other fields as needed

        return dto;
    }

    public Comment convertToEntity() {
        Comment comment = new Comment();
        comment.setCommentID(this.commentID);
        comment.setCommentText(this.commentText);
        comment.setCreatedDate(this.createdDate);
        comment.setEnabled(this.enabled);
        comment.setUser(this.user.convertToEntity());
        // Set other fields as needed

        return comment;
    }
}
