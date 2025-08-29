import 'dart:convert';
import 'package:http/http.dart' as http;

class DbMatch {
  final String baseUrl = 'http://localhost:3000/match';

  Future<List<dynamic>> getMatches() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load matches');
    }
  }

  Future<dynamic> getMatchById(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/$id'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else if (response.statusCode == 404) {
      throw Exception('Match not found');
    } else {
      throw Exception('Failed to load match');
    }
  }

  Future<void> createMatch(
    int idMaster,
    DateTime dataInicio,
    String estadoPartida,
  ) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'idMaster': idMaster,
        'data_inicio': dataInicio.toIso8601String(),
        'estado_partida': estadoPartida,
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Falha ao criar a partida');
    }
  }

  Future<void> updateMatch(
    int id,
    int idMaster,
    DateTime dataFim,
    String estadoPartida,
  ) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'idMaster': idMaster,
        'data_fim': dataFim.toIso8601String(),
        'estado_partida': estadoPartida,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Falha ao atualizar a partida');
    }
  }

  Future<void> deleteMatch(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));

    if (response.statusCode != 200) {
      throw Exception('Falha ao deletar a partida');
    }
  }
}
