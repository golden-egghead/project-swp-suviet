package com.example.SuViet.dto;

import com.example.SuViet.model.Article;
import com.example.SuViet.model.Comment;
import com.example.SuViet.model.Period;
import com.example.SuViet.model.Vote;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class ArticleDTO {
    private int articleID;
    private String title;
    private String context;
    private String photo;
    private String createdDate;
    private boolean status;
    private int articleView;
    private UserDTO user;
    private int voteLevel;
    private String periodName;
    private List<CommentDTO> comments;
    private List<RepliesCommentDTO> repliesComments;

    public static ArticleDTO convertToDTO(Article article) {
        ArticleDTO dto = new ArticleDTO();
        dto.setArticleID(article.getArticleID());
        dto.setTitle(article.getTitle());
        dto.setContext(article.getContext());
        dto.setPhoto(article.getPhoto());

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dto.setCreatedDate(dateFormat.format(article.getCreatedDate()));

        dto.setStatus(article.isStatus());
        dto.setArticleView(article.getArticleView());
        dto.setUser(UserDTO.convertToDTO(article.getUser()));
        dto.setVoteLevel(getAverageVoteLevel(article.getVotes()));
        dto.setPeriodName(getPeriodNames(article.getPeriods()));
        dto.setComments(getCommentDTOList(article.getComments()));
        dto.setRepliesComments(getRepliesCommentDTOList(article.getComments()));
        return dto;
    }

    public Article convertToEntity() {
        Article article = new Article();
        article.setArticleID(this.articleID);
        article.setTitle(this.title);
        article.setContext(this.context);
        article.setPhoto(this.photo);

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date formattedDate = dateFormat.parse(this.createdDate);
            article.setCreatedDate(formattedDate);
        } catch (Exception e) {
            e.printStackTrace();
        }

        article.setStatus(this.status);
        article.setArticleView(this.articleView);
        article.setUser(this.user.convertToEntity());
        // Set other fields as needed

        return article;
    }

    private static int getAverageVoteLevel(Collection<Vote> votes) {
        if (votes.isEmpty()) {
            return 0;
        }

        int totalVotes = votes.size();
        int totalVoteLevel = 0;
        for (Vote vote : votes) {
            totalVoteLevel += vote.getVoteLevel();
        }
        return totalVoteLevel / totalVotes;
    }

    private static String getPeriodNames(Collection<Period> periods) {
        if (periods.isEmpty()) {
            return "";
        }

        return periods.stream()
                .map(Period::getPeriodName)
                .collect(Collectors.joining(", "));
    }

    // private static List<CommentDTO> getCommentDTOList(Collection<Comment> comments) {
    //     return comments.stream()
    //             .map(CommentDTO::convertToDTO)
    //             .collect(Collectors.toList());
    // }

    // private static List<RepliesCommentDTO> getRepliesCommentDTOList(Collection<Comment> comments) {
    //     return comments.stream()
    //             .flatMap(comment -> comment.getRepliesComments().stream())
    //             .map(RepliesCommentDTO::convertToDTO)
    //             .collect(Collectors.toList());
    // }

    private static List<CommentDTO> getCommentDTOList(Collection<Comment> comments) {
        return comments.stream()
                .map(CommentDTO::convertToDTO)
                .collect(Collectors.toList());
    }

    private static List<RepliesCommentDTO> getRepliesCommentDTOList(Collection<Comment> comments) {
        List<RepliesCommentDTO> repliesCommentDTOs = new ArrayList<>();

        comments.forEach(comment -> {
            comment.getRepliesComments()
                .forEach(repliesComment -> repliesCommentDTOs.add(RepliesCommentDTO.convertToDTO(repliesComment)));
        });

        return repliesCommentDTOs;
    }
}
