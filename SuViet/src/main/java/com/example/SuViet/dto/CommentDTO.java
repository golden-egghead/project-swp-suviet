package com.example.SuViet.dto;

import com.example.SuViet.model.Comment;
import com.example.SuViet.model.RepliesComment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private int commentID;
    private String commentText;
    private String createdDate;
    private boolean enabled;
    private UserDTO user;
    private int userID;
    private int articleID;
    private List<RepliesCommentDTO> repliesComments;

    public static List<CommentDTO> convertToDTOList(List<Comment> comments) {
        return comments.stream()
                .map(CommentDTO::convertToDTO)
                .collect(Collectors.toList());
    }

    public static CommentDTO convertToDTO(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setCommentID(comment.getCommentID());
        dto.setCommentText(comment.getCommentText());
        // dto.setCreatedDate(comment.getCreatedDate());
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        dto.setCreatedDate(comment.getCreatedDate().format(dateFormatter));
        dto.setEnabled(comment.isEnabled());
        dto.setUser(UserDTO.convertToDTO(comment.getUser()));
        // dto.setRepliesComments(new ArrayList<>(comment.getRepliesComments()));
        dto.setRepliesComments(comment.getRepliesComments().stream()
                .map(RepliesCommentDTO::convertToDTO)
                .collect(Collectors.toList()));
        return dto;
    }

    public Comment convertToEntity() {
        Comment comment = new Comment();
        comment.setCommentID(this.commentID);
        comment.setCommentText(this.commentText);
        // comment.setCreatedDate(this.createdDate);
		try {
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDateTime formattedDate = LocalDateTime.parse(this.createdDate, dateFormatter);
            comment.setCreatedDate(formattedDate);

        } catch (Exception e) {
            e.printStackTrace();
        }
        comment.setEnabled(this.enabled);
        comment.setUser(this.user.convertToEntity());
        // Set other fields as needed

        return comment;
    }
}
