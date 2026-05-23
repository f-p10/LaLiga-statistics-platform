package com.ll.LaLiga_2025.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Component
public class PlayerService {
    private final PlayerRepository _repository;


    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this._repository = playerRepository;
    }

    public List<Player> getPlayers(){
        return _repository.findAll();
    }
    public List<Player> getPlayersByTeam(String team){
        return _repository.findAll().stream().filter(player -> team.equals(player.getTeam()))
                .collect(Collectors.toList());
    }
    public List<Player> getPlayersByName(String playerName){
        return _repository.findAll().stream().filter(player ->  player.getName().toLowerCase().contains(playerName.toLowerCase()))
                .collect(Collectors.toList());
    }
    public List<Player> getPlayersByPos(String position){
        return _repository.findAll().stream().filter(player -> player.getPosition().toLowerCase().contains(position.toLowerCase()))
                .collect(Collectors.toList());
    }
    public List<Player> getPlayersByNation(String nat){
        return _repository.findAll().stream().filter(player -> player.getNation().toLowerCase().contains(nat.toLowerCase()))
                .collect(Collectors.toList());
    }
    public List<Player>getPlayersByGoals(Integer goals){
        return _repository.findAll().stream().filter(player -> goals <= player.getGls())
                .collect(Collectors.toList());
    }
    public List<Player>getPlayersByAssists(Integer assists){
        return _repository.findAll().stream().filter(player -> assists <= player.getAst()).
                collect(Collectors.toList());
    }
    public List<Player>getPlayersByGA(Integer ga){
        return _repository.findAll().stream().filter(player -> ga <= (player.getGls()+player.getAst())).
                collect(Collectors.toList());
    }
}
